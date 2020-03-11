import React from "react";
import Task from "./Task";
import ActionButton from "./ActionButton";

const ColumnList = ({ title, tasks, columnID }) => {
  return (
    <div style={styles.columnContainer}>
      <h4>{title}</h4>
      {tasks.map(task => (
        <Task key={task.id} content={task.content} />
      ))}
      <ActionButton columnID={columnID}/>
    </div>
  );
};

const styles = {
  columnContainer: {
    backgroundColor: "#9a9696",
    borderRadius: 3,
    width: 300,
    padding: 8,
    height: "100%",
    marginRight: 8
  }
};

export default ColumnList;
