// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import ComingSoon from "./Components/ComingSoon";

const App = () => {
  return (
    <>
      

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Any other nav page -> ComingSoon */}
        <Route path="/about" element={<ComingSoon />} />
        <Route path="/our-range" element={<ComingSoon />} />
        <Route path="/recipes" element={<ComingSoon />} />
        <Route path="/fanclub" element={<ComingSoon />} />
        <Route path="/indomie-cafe" element={<ComingSoon />} />
        <Route path="/iha" element={<ComingSoon />} />
        <Route path="/stay-updated" element={<ComingSoon />} />
        <Route path="/get-in-touch" element={<ComingSoon />} />

        {/* Fallback */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </>
  );
};

export default App;
