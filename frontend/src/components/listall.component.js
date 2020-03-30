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
      Axios.get("http://localhost:5000/tasks/"),
      Axios.get("http://localhost:5000/columns/")
    ]).then(
      Axios.spread((tasksRes, columnsRes) => {
        this.setState({ tasks: tasksRes.data });
        this.setState({ columns: columnsRes.data });
        //  his.setState({ list: props => (<div><h2>{props.column.status}</h2><div><h4>Task Placeholder</h4>{this.log()}{/* {this.renderTaskIfMatchColumnStatus} */}</div></div>)});
      })
    );
  }

  deleteTask(id) {
    Axios.delete("http://localhost:5000/tasks/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    });
  }

  // log(){
  //     if(this.state.columns.length !== 0)
  //     {
  //         var tempT = this.state.tasks;
  //         var tempC = this.state.columns;
  //         resC = Array.from(new Set(tempC.map(el => el.status)))
  //         .map(status => {
  //             return {
  //                 status: status,
  //             };
  //         });

  //         resT = tempT.filter( el =>{
  //             return el.status;
  //         });

  //         const map = resC.map(i => {
  //            const temp = resT.map(j =>{
  //                   const p = (i.status === j.status ? j : null );
  //                   return p;
  //             })
  //             const r = temp.filter(el =>{
  //                 return el != null;
  //             })
  //             return [i,r];
  //         })

  //         for(const i in map)
  //         {
  //             for(const j in map[i])
  //             {
  //                 for(const k in map[i][j])
  //                 {
  //                     // //console.log(i+' '+j+' '+k)
  //                     // console.log(map[i][j].status);
  //                     // console.log(map[i][j][k].name);
  //                     // console.log(map[i][j][k].description);
  //                     // console.log(map[i][j][k].user);
  //                 }
  //             }
  //         }

  //         console.log("##########");
  //         // console.log(map.length);
  //         // console.log(map)
  //         // console.log(map[0][0].status);
  //         // console.log(map[1][0].status);
  //         // console.log(map[2][0].status);
  //         // console.log(map[3][0].status);
  //         console.log(map);
  //         // console.log(map[0][1][0].name);
  //         // console.log(map[0][1].length);
  //         // 1.[] column status name 2.[] tasks that equals column status 3.[] single task number
  //         //[0-backlog, 1-todo, 2-inprogress, 3-done][0-task1, 1-tasks2][1][_id,name,description,status,user]
  //         // console.log(fullMap);
  //     };
  // }
  // testFun(callback){
  //     console.log(callback);
  // }
  // renderALL()
  // {
  //   return  this.state.columns.map(column => {
  //       return (column === column
  //        ? <Column column={column} col={column} key={column._id}>{console.log("true")}</Column>
  //        : this.state.tasks.map(task => {
  //            return (column.status === task.status)
  //            ? React.createElement(
  //                {

  //                }
  //            )
  //            : console.log("False");
  //        })
  //     )}
  //     )
  //   }

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