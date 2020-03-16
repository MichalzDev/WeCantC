import { CONSTANTS } from "../actions";
let columnID = 0;
const initialState = ["column-0"];

const columnOrderReducer = (state = initialState, action) => {
  console.log("columnorder", state);
  switch (action.type) {
    case CONSTANTS.ADD_COLUMN: {
      columnID += 1;
      const newID = `column-${columnID}`;
      return [...state, newID];
    }
    default:
      return state;
  }
};

export default columnOrderReducer;