import HomePage from "./pages/homePage/homePage";
import React from "react";
import { Routes, Route } from "react-router-dom";

const HatsPage = () => {
  return <div>home page</div>;
};

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/hats" element={<HatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
