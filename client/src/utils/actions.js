export const UPDATE_ITEMS = "UPDATE_ITEMS";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_MULTIPLE_TO_CART = "ADD_MULTIPLE_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";
export const TOGGLE_CART = "TOGGLE_CART";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

export const SELECT_TABLE = 'SELECT_TABLE';
export const selectTable = (tableId) => {
  return {
    type: SELECT_TABLE,
    payload: tableId,
  };
};

export const JOIN_TABLE = 'JOIN_TABLE';
export const joinTable = (tableId) => {
  return {
    type: JOIN_TABLE,
    payload: tableId,
  };
};

export const LEAVE_TABLE = 'LEAVE_TABLE';
export const leaveTable = () => {
  return {
    type: LEAVE_TABLE,
  };
};

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    payload: message,
    tableId: message.tableId,
    sender: message.sender,
  };
};