import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      {/* <Route path={`/Details/:id`} element={<Details />}></Route> */}
    </Routes>
  );
}

export default App;
