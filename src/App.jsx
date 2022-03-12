import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import ImageDescription from "./components/ImageDescription";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/images/:id" element={<ImageDescription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
