
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";

import LoginPage from "./scenes/loginpage";
import HomePage from "./scenes/homepage";

function App() {
  const mode = useSelector((state) => state.userState.mode);

  const isAuth = Boolean(useSelector((state) => state.userState.token));

  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={!isAuth ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
