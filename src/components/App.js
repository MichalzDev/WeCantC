import React, { PureComponent } from "react";
import Column from "./Column";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends PureComponent {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { columns, columnOrder, tasks } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          <h2>Hello world</h2>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <ColumnsContainer {...provided.droppableProps} ref={provided.innerRef}>
                {columnOrder.map((columnID, index) => {
                  const column = columns[columnID];
                  if (column) {
                    const columnTasks = column.tasks.map(taskID => tasks[taskID]);
                    return (
                      <Column
                      columnID={column.id}
                      key={column.id}
                      title={column.title}
                      tasks={columnTasks}
                      index={index}
                      />
                    );
                  }
                })}
                {provided.placeholder}
                <Create addColumn />
              </ColumnsContainer>
            )}
          </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.columns,
  columnOrder: state.columnOrder,
  tasks: state.tasks
});

export default connect(mapStateToProps)(App);
