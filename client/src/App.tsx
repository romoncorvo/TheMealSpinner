import React from "react";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { useLocalStorage } from "usehooks-ts";
import { LoginResponse } from "./Utils/Types";
import Favorites from "./Pages/Favorites";

function App() {
  const [user, setUser] = useLocalStorage<LoginResponse>("user", {
    id: 0,
    userName: "",
    token: "",
  });

  return (
    <>
      <MyNavbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />}></Route>
        <Route path="/favorites" element={<Favorites user={user} />}></Route>
        <Route path="/login" element={<SignIn setUser={setUser} />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App;
