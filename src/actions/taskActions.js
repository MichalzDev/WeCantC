import { CONSTANTS } from '../actions';

export const addTask = (columnID, content) => {
    return {
        type: CONSTANTS.ADD_TASK,
        payload: {content, columnID}
    };
};