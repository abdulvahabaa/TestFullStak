// import Sidebar from "./components/Sidebar";
// import Feed from "./components/Feed";
// import Rightbar from "./components/Rightbar";
// import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
// import Navbar from "./components/Navbar";
// import Add from "./components/Add";
// import { useState } from "react";

// function App() {
//   const [mode, setMode] = useState("light");

//   const darkTheme = createTheme({
//     palette: {
//       mode: mode,
//     },
//   });
//   return (

//     <ThemeProvider theme={darkTheme}>
//       <Box bgcolor={"background.default"} color={"text.primary"}>
//         <Navbar />
//         <Stack direction="row" spacing={2} justifyContent="space-between">
//         <Sidebar setMode={setMode} mode={mode}/>
//           <Feed />
//           <Rightbar />
//         </Stack>
//         <Add />
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default App;

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
