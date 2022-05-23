import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import NotFound from "./NotFound/NotFound";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/home/Home";
import Profile from "./component/profile/Profile";
import ServerPlace from "./component/serverPlace/ServerPlace";
import Chat from "./component/chat/Chat";
import { logout } from "./features/authSlice";
import Server from "./component/server/Server";
import LandingPage from "./component/LandingPage/LandingPage";

function App() {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <div className="app">
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/servers" element={<Server />}>
            <Route path="@me" element={<Home />}>
              <Route index element={<Chat />} />
              <Route path=":conversationId" element={<Chat />} />
            </Route>
            <Route path=":serverId" element={<ServerPlace />}>
              <Route index element={<Chat />} />
              <Route path=":channelId" element={<Chat />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
