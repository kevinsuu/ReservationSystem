import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./SignInSide";
import ForgotPassword from "./ForgetPassword";
import Register from "./Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./HomePage";
import Location from "./Components/Location";
import Change from "./Components/Change";
import Backstage from "./Components/Backstage";
import { createGlobalStyle } from "styled-components";
import huninnUrl from "./assets/jf-openhuninn-1.1.ttf";
const theme = createTheme();

theme.typography = {
  fontFamily: `huninn,"Roboto", "Helvetica", "Arial", sans-serif`,
  pxToRem: (size) => `${(size / 16) * 1}rem`,
};
function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/location" element={<Location />} />
            <Route path="/change" element={<Change />} />
            <Route path="/backstage" element={<Backstage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
@font-face
{
    font-family: "huninn";
    src: url(${huninnUrl}) format("truetype");
    font-weight: normal;  
    font-style: normal;  
    /* font-display:optional; */
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  /* font-family: "Clear Sans",sans-serif; */
  /* font-family: "huninn"; */
}

body{
    font-family: "huninn";
  background-color: #fbf5f3;

}

p{
  color: #585858;
  /* color: #2f2f2f; */
}
`;
