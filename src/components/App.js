import React, { Component } from 'react';
import Column from './Column';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Hello world</h2>
        <Column title="test" />
      </div>
    )
  }
}

export default App;