import { createContext, useContext } from "react";

const APIContext = createContext();

const ContextProvider = ({ children }) => {
  const api = "http://127.0.0.1:8000/";
  // const api = "https://sardorfarhodogli.pythonanywhere.com/";

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
};

export { APIContext, ContextProvider };
