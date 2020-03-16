import { CONSTANTS } from "../actions";

const initialState = {
  "task-0": {
    content: "Task",
    id: `task-0`,
    column: "column-0"
  }
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default tasksReducer;