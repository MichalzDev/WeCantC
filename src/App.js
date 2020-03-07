import React, { useState, Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

const BacklogItems = [
  { id: uuid(), content: "1 task" }
];
const ToDoItems = [];
const InProgressItems = [];
const DoneItems = [];

const columnsFromBackend = {
  [uuid()]: {
    name: "Backlog",
    items: BacklogItems
  },
  [uuid()]: {
    name: "To do",
    items: ToDoItems
  },
  [uuid()]: {
    name: "In progress",
    items: InProgressItems
  },
  [uuid()]: {
    name: "Done",
    items: DoneItems
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  
  const { source, destination } = result;
		console.log(result.id);
  if(source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const { source, destination } = result;
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    }); 
  }
};


function addTask(col){
	var len = BacklogItems.length + ToDoItems.length + InProgressItems.length + DoneItems.length + 1;
	if (col === "Backlog"){
		if (BacklogItems.length<5) BacklogItems.push({ id: uuid(), content: len+" task" });
	}
	else if (col === "To do"){
		if (ToDoItems.length<5) ToDoItems.push({ id: uuid(), content: len+" task" });
	}
	else if (col === "In progress"){
		if (InProgressItems.length<5) InProgressItems.push({ id: uuid(), content: len+" task" });
	}
	else if (DoneItems.length<5){
		DoneItems.push({ id: uuid(), content: len+" task" });
	}
}

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  
  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "center", height: "100%" }}
    >
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          
		  return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2>{column.name}</h2>
			  
				<button id={column.name} onClick={() => addTask(column.name)} > Add Task </button>
			  
			  
              <div style={{ margin: 8 }}>
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return (
                  <div id={column.name}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "#535353"
                        : "#9a9696",
                      padding: 4,
                      width: 250,
                      minHeight: 500
                    }}
                  >
                    {column.items.map((item, index) => {
                      
						return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: 16,
                                  margin: "0 0 8px 0",
                                  minHeight: "50px",
                                  backgroundColor: snapshot.isDragging
                                    ? "#ff5a00"
                                    : "#ff8948",
                                  color: "white",
                                  ...provided.draggableProps.style
                                }}
                              >
                                {item.content}
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
