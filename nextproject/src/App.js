import Router from "./router";
import { Box } from "@mui/material";
import Links from "./router/Links";
import { createContext, useReducer, useState } from "react";

export const AppContextState = createContext({});
function App() {
  const [page, setPage] = useState("Dashboard");
  const [to, setTo] = useState("/dashboard");
  const initialState = {
    role: "Data Analyst",
    location: "",
    company: "",
    expereince: "",
    tool: {},
    experience: {},
    education: {},
    workType: {},
    skills: {},
    sectors: {},
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "User_Input":
        return { ...state, [action.field]: action.payload };
      case "Get_Data":
        return { ...state, [action.key]: action.value };
      default:
        return state;
    }
  };

  const [data, setData] = useReducer(reducer, initialState);
  return (
    <AppContextState.Provider
      value={{ page, setPage, to, setTo, data, setData }}
    >
      <Box component="div" id="swup" className="main home transition-fade">
        <Links />
        <Router />
      </Box>
    </AppContextState.Provider>
  );
}

export default App;
