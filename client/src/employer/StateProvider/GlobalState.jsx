import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

export const AppState = (props) => {
  const initialState = {
    isLoggedIn: false,
    setLoginModalOpen: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ initialState }}>
      {props.children}
    </AppContext.Provider>
  );
};
