import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers/reducers'

const StoreContext = createContext();
const initialState = {
  joinedTable: null,
  messages: [],
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    items: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    selectedTable: null,
  });

  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
