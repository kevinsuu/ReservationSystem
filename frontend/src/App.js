import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignInCard from "./sign-in-side/SignInCard"; // 假設 SignInCard 組件在 './templates/SignInCard' 路徑下

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInCard />} />
      </Routes>
    </Router>
  );
}

export default App;
