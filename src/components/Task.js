import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const TaskContainer = styled.div`
  margin: 0 0 8px 0;
`;

const Task = ({ content, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <TaskContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardContent>
              <Typography gutterBottom>{content}</Typography>
            </CardContent>
          </Card>
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;
