import React from "react";
import Task from "./Task";
import ActionButton from "./ActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ColumnContainer = styled.div`
  background-color: #ff8948;
  border-radius: 3px;
  width: 300;
  padding: 8px;
  height: 100%;
  margin-right: 8px;
`;

const ColumnList = ({ title, tasks, columnID, index }) => {
  return (
    <Draggable draggableId={String(columnID)} index={index}>
      {provided => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
          <Droppable droppableId={String(columnID)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{title}</h4>
                {tasks.map((task, index) => (
                  <Task
                    id={task.id}
                    index={index}
                    key={task.id}
                    content={task.content}
                  />
                ))}
                {provided.placeholder}
                <ActionButton columnID={columnID} />
              </div>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default ColumnList;
