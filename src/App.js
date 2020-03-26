import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ListALL from './components/listall.component';
import AddTaskModal from "./components/addtaskmodal.component";
import EditTaskModal from "./components/edittaskmodal.component";


//Main app function
function App() {
  return (
    <Router>
      <div className="App">
        {/* <AddTaskModal></AddTaskModal> */}
      <Route path="/tasks/add" exact component={AddTaskModal}/> 
      <Route path="/tasks/update/:id" exact component={EditTaskModal}/> 
        <div className="columnbox">
        {/* <Route path="/" exact component={ShowColumns}/> */}
        <Route path="/" exact component={ListALL}/> 
         {/* <ShowColumns></ShowColumns>  */}
      

      {/* <Route path="/edit/:id" exact component={EditTask}/> */}
   
      </div>
    </div>
    </Router>
  );
}

export default App;
