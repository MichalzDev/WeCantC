import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

var resC;
var resT;
var fullMap;

const columnStyle = {
  border: "2px solid orange",
  borderRadius: "3px",
  width: "300px",
  height: "100%",
  padding: "8px",
  margin: "5px 20px 15px 0px",
  display: "flex",
  flexDirection: "column"
};
const buttonStyle = {
  backgroundColor: "#4CAF50",
  border: "none",
  borderRadius: "5px",
  color: "white",
  padding: "15px 26px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "18px",
  marginBottom: "18px",
  cursor: "pointer"
};
const columnboxStyle = {
  backgroundColor: "#282c34",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row"
};
const statusStyle = {
  textTransform: "uppercase"
};
const btn = {
  backgroundColor: "inherit",
  border: "none",
  color: "white",
  margin: "4px 16px 12px 16px",
  fontSize: "16px",
  cursor: "pointer"
};
const btnbox = {
  display: "flex",
  justifyContent: "space-between"
};
const taskStyle = {
  backgroundColor: "rgba(0,0,0,0.33)",
  border: "1px solid darkorange",
  borderRadius: "3px",
  width: "90%",
  margin: "5px 0px 8px 14px",
  padding: "5px 5px 0px 5px",
  display: "flex",
  flexDirection: "column",
  wordWrap: 'break-word'
};



// TASKS --------------
export default class ListALL extends Component {
  constructor(props) {
    super(props);
    window.func = this;
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      tasks: [],
      columns: [],
      map: []
    };
  }

  componentDidMount() {
    Axios.all([
      Axios.get("/tasks/"),
      Axios.get("/columns/")
    ]).then(
      Axios.spread((tasksRes, columnsRes) => {
        this.setState({ tasks: tasksRes.data });
        this.setState({ columns: columnsRes.data });
      })
    );
  }

  deleteTask(id) {
    Axios.delete("/tasks/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    });
  }

  renderALLv2() {
    resT = this.state.tasks;
    return this.state.columns.map(col => {
      return <Column column={col} key={col._id} />;
    });
  }
  render() {
    return <div style={columnboxStyle}>{this.renderALLv2()}</div>;
  }
}


function renderTaskIfMatch(tsk, col) {
    return tsk.map(el => {
      return el.status === col ? (
        <Task task={el} key={el._id} />
      ) : (
        console.log("task not equal column")
      );
    });
  }
  
  const Task = props => (
    <div style={taskStyle}>
      <h4>{props.task.name}</h4>
      <h5 style={{fontSize: '0.8rem'}}>{props.task.description}</h5>
      <div className="row">
        <div className="col-sm"><h6>STATUS: </h6></div> 
        <div className="col-sm" style={{textTransform: 'uppercase', paddingLeft: '0px'}}><h6>{props.task.status}</h6></div>
      </div>
      <div className="row">
        <div className="col-sm"><h6>USER: </h6></div> 
        <div className="col-sm" style={{paddingLeft: '0px'}}><h6>{props.task.user}</h6></div>
      </div>
      <div style={btnbox}>
        {/* Link does not refresh browser */}
        <Link to={"/tasks/update/"+props.task._id} style={btn}>
          <i className="fa fa-pencil"></i>
        </Link>
        <Link
          to="/"
          onClick={() => {
            window.func.deleteTask(props.task._id)
          }}
          style={btn}
        >
          <i className="fa fa-trash"></i>
        </Link>
      </div>
    </div>
  );
  // TASK
  
  
  const Column = props => (
    <div style={columnStyle}>
      <div>
        <h2 style={statusStyle}>{props.column.status}</h2>
        <a href="/tasks/add" style={buttonStyle}>
          Add task
        </a>
      </div>
      {renderTaskIfMatch(resT, props.column.status)}
    </div>
  );