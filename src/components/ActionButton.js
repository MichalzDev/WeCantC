import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addColumn, addTask } from "../actions";
import styled from "styled-components";

class ActionButton extends React.Component {
  state = {
    formOpen: false,
    content: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleAddColumn = () => {
    const { dispatch } = this.props;
    const { content } = this.state;

    if (content) {
      this.setState({
        content: ""
      });
      dispatch(addColumn(content));
    }

    return;
  };

  handleAddTask = () => {
    const { dispatch, columnID } = this.props;
    const { content } = this.state;

    if (content) {
      this.setState({
        content: ""
      });
      dispatch(addTask(columnID, content));
    }
  };

  renderAddButton = () => {
    const { addColumn } = this.props;

    const buttonText = addColumn ? "Add a column" : "Add a task";
    const textColor = addColumn ? "white" : "inherit";
    const buttonOpacity = addColumn ? 1 : 0.5;
    const buttonBackground = addColumn ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonOpacity};
      color: ${textColor};
      background-color: ${buttonBackground};
    `;

    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  renderForm = () => {
    const { addColumn } = this.props;

    const placeholder = addColumn
      ? "Enter a column name..."
      : "Enter a task description...";
    const buttonText = addColumn ? "Add column" : "Add task";

    const Container = styled.div`
      width: ${addColumn ? "300px" : "100%"};
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
            onBlur={this.closeForm}
            value={this.state.content}
            onChange={this.handleInputChange}
          />
        </StyledCard>
        <ButtonContainer>
          <StyledButton
            onMouseDown={addColumn ? this.handleAddColumn : this.handleAddTask}
            variant="contained"
            children={buttonText}
          />
          <StyledIcon onClick={this.closeForm}>close</StyledIcon>
        </ButtonContainer>
      </Container>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(ActionButton);
