import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ content, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <Card style={styles.taskContainer}>
          <CardContent>
            <Typography gutterBottom>{content}</Typography>
          </CardContent>
        </Card>
        </div>
      )}
    </Draggable>
  );
};

const styles = {
  taskContainer: {
    backgroundColor: "#ff8948",
    color: "white",
    marginBottom: 8
  }
};

export default Task;
