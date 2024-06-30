import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShoppingList from "../src/pages/List/ShoppingList";
import Login from "./pages/auth/Login";
import History from "./pages/history/History";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
