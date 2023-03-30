import { SELECT_TABLE } from '../actions';

export const selectedTableReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_TABLE:
      return action.tableId;
    default:
      return state;
  }
};
