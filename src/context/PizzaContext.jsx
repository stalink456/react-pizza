import { createContext, useReducer } from "react";
import PizzaReducer from "./PizzaReducer";

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const initialState = {
    pizzas: [],
    loading: false,
    sort: 0,
  };

  const [state, dispatch] = useReducer(PizzaReducer, initialState);

  return (
    <PizzaContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaContext;
