import {CONSTANTS} from '../actions';

let columnID = 2;
let taskID = 2;

const initialState = [
    {
        id: 0,
        title: "test title",
        tasks: [
            {
                id: 0,
                content: "content Test 1"
            },
            {
                id: 1,
                content: "content Test 2"
            }
        ]
    },
    {
        id: 1,
        title: "test title",
        tasks: [
            {
                id: 0,
                content: "content Test 1"
            },
            {
                id: 1,
                content: "content Test 2"
            }
        ]
    }
]

const columnReducer = (state = initialState, action) => {
    switch(action.type) {

case CONSTANTS.ADD_COLUMN:
    const newColumn = {
        title: action.payload,
        tasks: [],
        id: columnID
    }
    columnID += 1
    return [...state, newColumn];

    case CONSTANTS.ADD_TASK:
        const newTask = {
            content: action.payload.content,
            id: taskID
        }
        taskID += 1

        const newState = state.map(column => {
            if(column.id === action.payload.columnID) {
                return {
                    ...column,
                    tasks: [...column.tasks, newTask]
                }
            } else {
                return column;
            }
        })

        return newState;

        default:
            return state;
    }
}

export default columnReducer;