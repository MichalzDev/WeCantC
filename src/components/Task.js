import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";

const TaskContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${TaskContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const Task = ({ content, id, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskContent, setTaskContent] = useState(content);

  const closeForm = e => {
    console.log("clicked");
    setIsEditing(false);
  };

  const saveTask = () => {
    // run redux action
  };

  const renderEditForm = () => {
    return (
      <Form
        content={taskContent}
        setContent={setTaskContent}
        closeForm={closeForm}
        actionButtonClicked={saveTask}
      />
    );
  };

  const renderTask = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              <EditButton fontSize="small">edit</EditButton>
              <CardContent>
                <Typography>{content}</Typography>
              </CardContent>
            </Card>
          </TaskContainer>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderTask();
};

export default Task;
