import React, { Component } from "react";
import Column from "./Column";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";

class App extends Component {
  render() {
    const { columns } = this.props;
    return (
      <div className="App">
        <h2>Hello world</h2>
        <div style={styles.columnsContainer}>
          {columns.map(column => (
            <Column key={column.id} title={column.title} tasks={column.tasks} />
          ))}
          <ActionButton addColumn />
        </div>
      </div>
    );
  }
}

const styles = {
  columnsContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 8
  }
};

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(App);
