import React from "react";

const GroupingDropdown = ({ onGroupChange }) => {
  return (
    <select onChange={(e) => onGroupChange(e.target.value)}>
      <option value="status">Group by Status</option>
      <option value="userId">Group by User</option>
      <option value="priority">Group by Priority</option>
    </select>
  );
};

export default GroupingDropdown;
