import { createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const value = {};

  return <AppContext.Provider>{props.children}</AppContext.Provider>;
};
