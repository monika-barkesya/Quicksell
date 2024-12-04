import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/styles.css";

const Card = ({ ticket }) => {
  const { title, tag, priority } = ticket;

  const priorityColors = [
    { label: "No Priority", color: "#9e9e9e" },
    { label: "Low", color: "#43a047" },
    { label: "Medium", color: "#fdd835" },
    { label: "High", color: "#fb8c00" },
    { label: "Urgent", color: "#e53935" },
  ];

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>
        <FontAwesomeIcon icon={faTag} className="icon" /> {tag.join(", ")}
      </p>
      <p style={{ color: priorityColors[priority].color }}>
        <FontAwesomeIcon icon={faExclamationCircle} className="icon" />{" "}
        {priorityColors[priority].label}
      </p>
    </div>
  );
};

export default Card;
