import {CONSTANTS} from '../actions'

export const addColumn = (title) => {
    return {
        type: CONSTANTS.ADD_COLUMN,
        payload: title
    }
}