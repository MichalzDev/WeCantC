import { CONSTANTS } from '../actions';

let columnID = 2;
let taskID = 4;

const initialState = [
    {
        id: `column-${0}`,
        title: "test title",
        tasks: [
            {
                id: `task-${0}`,
                content: "content Test 1"
            },
            {
                id: `task-${1}`,
                content: "content Test 2"
            }
        ]
    },
    {
        id: `column-${1}`,
        title: "test title",
        tasks: [
            {
                id: `task-${2}`,
                content: "content Test 1"
            },
            {
                id: `task-${3}`,
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
                id: `column-${columnID}`
            }
            columnID += 1;
            return [...state, newColumn];

        case CONSTANTS.ADD_TASK:
            const newTask = {
                content: action.payload.content,
                id: `task-${taskID}`
            };
            taskID += 1;

            const newState = state.map(column => {
                if(column.id === action.payload.columnID) {
                    return {
                        ...column,
                        tasks: [...column.tasks, newTask]
                    }
                } else {
                    return column;
                }
            });

            return newState;

        default:
            return state;
    }
}

export default columnReducer;