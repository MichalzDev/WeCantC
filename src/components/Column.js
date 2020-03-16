import React from "react";
import Task from "./Task";
import Create from "./Create";
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-transform: uppercase;
`;

const ColumnList = React.memo(({ title, tasks, columnID, index, maxTasksNumber = 3 }) => {
  return (
    <Draggable draggableId={String(columnID)} index={index}>
      {provided => (
        <ColumnContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(columnID)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <TitleContainer>
                  <h4>{title}</h4>
                  <h6>
                    {maxTasksNumber} {maxTasksNumber > 1 ? "tasks" : "task"}{" "}
                    left
                  </h6>
                </TitleContainer>
                {tasks.map((task, index) => (
                  <Task
                    id={task.id}
                    index={index}
                    key={task.id}
                    content={task.content}
                    columnID={columnID}
                  />
                ))}
                {provided.placeholder}
                <Create columnID={columnID} />
              </div>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
});

export default ColumnList;
