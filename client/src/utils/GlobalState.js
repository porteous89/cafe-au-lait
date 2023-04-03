import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers/reducers'

const StoreContext = createContext();
// const { Provider } = StoreContext;
const initialState = {
  joinedTable: null,
  messages: [],
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: "",
    selectedTable: null,
    messages: [],
    joinedTable: null,
  });

  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
