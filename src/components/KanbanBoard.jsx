import React, { useEffect, useState } from "react";
import { fetchTickets } from "../services/api";
import GroupingDropdown from "./GroupingDropdown";
import SortDropdown from "./SortDropdown";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [groupedTickets, setGroupedTickets] = useState({});

  // Fetch tickets from the API
  useEffect(() => {
    fetchTickets().then((data) => setTickets(data.tickets));
  }, []);

  // Recalculate grouped tickets whenever `groupBy`, `sortBy`, or `tickets` change
  useEffect(() => {
    groupAndSortTickets();
  }, [groupBy, sortBy, tickets]);

  // Group and sort tickets
  const groupAndSortTickets = () => {
    const groups = {};

    // Group tickets based on the selected `groupBy` value
    tickets.forEach((ticket) => {
      const key = groupBy === "status" ? ticket.status : ticket[groupBy];
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
    });

    // Sort tickets in each group based on `sortBy`
    Object.keys(groups).forEach((key) => {
      groups[key] = groups[key].sort((a, b) =>
        sortBy === "priority"
          ? b.priority - a.priority
          : a.title.localeCompare(b.title)
      );
    });

    setGroupedTickets(groups);
  };

  return (
    <div>
      <div className="controls">
        <GroupingDropdown onGroupChange={setGroupBy} />
        <SortDropdown onSortChange={setSortBy} />
      </div>
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <KanbanColumn
            key={group}
            title={group}
            tickets={groupedTickets[group]}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
