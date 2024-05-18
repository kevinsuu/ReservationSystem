// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./SignInSide";
import ForgotPassword from "./ForgetPassword";
import Register from "./Register";

import HomePage from "./HomePage";
import Location from "./Components/Location";
import Change from "./Components/Change";
import Backstage from "./Components/Backstage";

function App() {
  return (
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
  );
}

export default App;
