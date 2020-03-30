import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal'


export default class EditTaskModal extends Component {
  constructor(props){
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      status:'',
      user:'',
      columns: [],
      users: [],
    }
  }
componentDidMount(){
  axios.get('/tasks/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          description: res.data.description,
          status: res.data.status,
          user: res.data.user,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  axios.get('/users/').then(res => {
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map(us => us.name),
      })
    }
  })
  axios.get('/columns/').then(res => {
    if (res.data.length > 0) {
      this.setState({
        columns: res.data.map(col => col.status),
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
    axios.post('/tasks/update/'+ this.props.match.params.id, task)
    .then(res => console.log(res.data));
    alert("Task edited");
    window.location = '/';
  }


  render() {
    return (
      <Modal isOpen={true}>
    <div>
      <h3>Edit task</h3>
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
            <input type="submit" value="Save" className="btn btn-primary"/>
            <a href="/" className='btn btn-danger'>Close</a>
          </div>
      </form>
    </div>
    </Modal>    
    )
  }
}     