import { combineReducers } from 'redux';
import columnReducer from './columnReducer';
import columnOrderReducer from './columnOrderReducer';
import tasksReducer from './tasksReducer';

export default combineReducers({
    columns: columnReducer,
    columnOrder: columnOrderReducer,
    tasks: tasksReducer
});