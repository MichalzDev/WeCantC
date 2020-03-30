import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal'


export default class AddTaskModal extends Component {
  constructor(props){
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      name: '',
      description: '',
      status:'',
      user:'',
      columns: [],
      users: [],
      show: true,
    }
  }
componentDidMount(){
  axios.get('/users/').then(res => {
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map(us => us.name),
        user: res.data[0].name,
      })
    }
  })
  axios.get('/columns/').then(res => {
    if (res.data.length > 0) {
      this.setState({
        columns: res.data.map(col => col.status),
        status: res.data[0].status,
      })
    }
  })
}

//changing values
  onChangeName(e){
    this.setState({
      name: e.target.value
    });
  }
  onChangeDescription(e){
    this.setState({
      description: e.target.value
    });
  }
  onChangeStatus(e){
    this.setState({
      status: e.target.value
    });
  }
  onChangeUser(e){
    this.setState({
      user: e.target.value
    });
  }
  //Modal show/hide
  handleShow() {
    this.setState({show: true});
  }
  handleClose() {
    this.setState({show: false});
  }

  //Send values

  onSubmit(e){
    e.preventDefault();
    
    const task = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      user: this.state.user,
    }

    console.log(this.state.users[0]);
    console.log(task);
    axios.post('/tasks/add/', task)
    .then(res => console.log(res.data));
    alert("Task added");
    window.location = '/';
  }


  render() {
    return (
      <Modal isOpen={this.state.show}>
    <div>
      <h3>Create new task</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Task name</label>
              <input type="text" className="form-control" required value={this.state.name} onChange={this.onChangeName} />
            </div>
            <div>
              <label>Description</label>
              <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
            </div>
            <div className="form-group">
              <label>User</label>
              <select ref="userInput" className="form-control" value={this.state.user} onChange={this.onChangeUser}>
              <option value={this.state.users[0]} selected disabled hidden>{this.state.users[0]}</option>
                {
                  this.state.users.map((usr)=>{
                    return <option key={usr} value={usr}>{usr}</option>
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select ref="userInput2" className="form-control" required value={this.state.status} onChange={this.onChangeStatus}>
              <option value={this.state.columns[0]} selected disabled hidden>{this.state.columns[0]}</option>
                {
                  this.state.columns.map((col)=>{
                    return <option key={col} value={col}>{col}</option>
                  })
                }
              </select>
            </div >
          <div className="form-group">
            <input type="submit" value="create task" className="btn btn-primary"/>
            <input type="button" onClick={this.handleClose} value="close" className="btn btn-danger"/>
          </div>
      </form>
    </div>
    </Modal>    
    )
  }
}     