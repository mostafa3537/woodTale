import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage/homePage";
import ShopPage from "./pages/shopPage/shopPage";
import Header from "./components/header/header.component";

import "./App.css";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </div>
  );
}

export default App;
