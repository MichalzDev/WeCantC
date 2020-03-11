import React from "react";
import Task from "./Task";
import ActionButton from "./ActionButton";
import { Droppable } from "react-beautiful-dnd";

const ColumnList = ({ title, tasks, columnID }) => {
  return (
    <Droppable droppableId={String(columnID)}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef} style={styles.columnContainer}>
          <h4>{title}</h4>
          {tasks.map((task, index) => (
            <Task key={task.id } index={index} content={task.content} id={task.id}/>
          ))}
          <ActionButton columnID={columnID} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
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
