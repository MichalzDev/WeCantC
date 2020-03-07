import React, { Component } from 'react';
import TrelloList from './TrelloList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Hello world</h2>
        <TrelloList />
      </div>
    )
  }
}

export default App;