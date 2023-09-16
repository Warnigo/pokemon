
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeP from "./components/home/homeP";
import Page from "./components/pages/page";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeP />} />
          <Route path="/pokemon/:id" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
