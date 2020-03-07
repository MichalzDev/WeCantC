import React from "react";
import Task from "./Task";

const ColumnList = ({ title, tasks }) => {
  return (
    <div style={styles.columnContainer}>
      <h4>{title}</h4>
      {tasks.map(task => (
        <Task content={task.content} />
      ))}
    </div>
  );
};

const styles = {
  columnContainer: {
    backgroundColor: "#9a9696",
    borderRadius: 3,
    width: 300,
    padding: 8,
    marginRight: 8
  }
};

export default ColumnList;
