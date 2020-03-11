import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { addColumn, addTask } from '../actions';


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
    const {dispatch} = this.props;
    const {content} = this.state;

    if(content) {
      this.setState({
        content: ""
      })
      dispatch(addColumn(content))
    }

    return;
  }

  handleAddTask = () => {
    const {dispatch, columnID} = this.props;
    const {content} = this.state;

    if(content) {
      this.setState({
        content: ""
      })
      dispatch(addTask(columnID, content))
    }
  }

  renderAddButton = () => {
    const { addColumn } = this.props;

    const buttonText = addColumn ? "Add a column" : "Add a task";
    const textColor = addColumn ? "white" : "inherit";
    const buttonOpacity = addColumn ? 1 : 0.5;
    const buttonBackground = addColumn ? "rgba(0,0,0,.15)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonOpacity,
          color: textColor,
          backgroundColor: buttonBackground
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { addColumn } = this.props;

    const placeholder = addColumn
      ? "Enter a column name..."
      : "Enter a task description...";
    const buttonText = addColumn ? "Add column" : "Add task";
    return (
      <div>
        <Card
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px"
          }}
        >
          <Textarea
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.content}
            onChange={this.handleInputChange}
            style={{
              resize: "none",
              width: "100%",
              overflow: "hidden",
              outline: "none",
              border: "none"
            }}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={addColumn ? this.handleAddColumn : this.handleAddTask}
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            {buttonText}{" "}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer"}}>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openFormButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10
  },
  formButtonGroup: {
marginTop: 8,
display: "flex",
alignItems: "center"
  }
};

export default connect () (ActionButton);
