import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers/reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    items: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    selectedTable: null,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
