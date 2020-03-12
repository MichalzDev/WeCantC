import { CONSTANTS } from "../actions";

let columnID = 4;
let taskID = 0;

const initialState = [
  {
    id: `column-${0}`,
    title: "Backlog",
    tasks: []
  },
  {
    id: `column-${1}`,
    title: "To do",
    tasks: []
  },
  {
    id: `column-${2}`,
    title: "In progress",
    tasks: []
  },
  {
    id: `column-${3}`,
    title: "Done",
    tasks: []
  }
];

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_COLUMN:
      const newColumn = {
        title: action.payload,
        tasks: [],
        id: `column-${columnID}`
      };
      columnID += 1;
      return [...state, newColumn];

    case CONSTANTS.ADD_TASK: {
      const newTask = {
        content: action.payload.content,
        id: `task-${taskID}`
      };
      taskID += 1;

      const newState = state.map(column => {
        if (column.id === action.payload.columnID) {
          return {
            ...column,
            tasks: [...column.tasks, newTask]
          };
        } else {
          return column;
        }
      });

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
      } = action.payload;
      const newState = [...state];

      // dragging columns around
      if(type === "column") {
          const column = newState.splice(droppableIndexStart, 1)
          newState.splice(droppableIndexEnd, 0, ...column);
          return newState;
      }

      // destination: same column

      if (droppableIdStart === droppableIdEnd) {
        const column = state.find(column => droppableIdStart === column.id);
        const task = column.tasks.splice(droppableIndexStart, 1);
        column.tasks.splice(droppableIndexEnd, 0, ...task);
      }

      // destination: other column

      if (droppableIdStart !== droppableIdEnd) {
          // find the column where drag happened
          const columnStart = state.find(column => droppableIdStart === column.id)
          
          // pull out the card from this column
          const task = columnStart.tasks.splice(droppableIndexStart, 1);

          // find the column where drag ended
          const columnEnd = state.find(column => droppableIdEnd === column.id);

          // put the task into a new column
          columnEnd.tasks.splice(droppableIndexEnd, 0, ...task)
      }


      return newState;

    default:
      return state;
  }
};

export default columnReducer;
