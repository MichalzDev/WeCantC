import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const Form = props => {
  const { addColumn, content = "", setContent, actionButtonClicked, closeForm } = props;

  const placeholder = addColumn
    ? "Enter column name..."
    : "Enter a task description...";

  const Container = styled.div`
    width: ${addColumn ? "300px" : "100%"};
    margin-bottom: 8px;
  `;

  const StyledCard = styled(Card)`
    min-height: 85px;
    padding: 6px 8px 2px;
  `;

  const StyledTextArea = styled(Textarea)`
    resize: none;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
  `;

  const StyledButton = styled(Button)`
    && {
      color: white;
      background: #5aac44;
    }
  `;

  const ButtonContainer = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    margin-left: 8px;
  `;

  const StyledIcon = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
  `;

  return (
    <Container>
      <StyledCard>
        <StyledTextArea
          placeholder={placeholder}
          autoFocus
          value={content}
          onChange={e => setContent(e.target.value)}
          onBlur={closeForm}
        />
      </StyledCard>
      <ButtonContainer>
        <StyledButton variant="contained" children="Save" />

        <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
      </ButtonContainer>
    </Container>
  );
};

export default Form;