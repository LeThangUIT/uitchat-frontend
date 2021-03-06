import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import ServerPlace from "./components/serverPlace/ServerPlace";
import Chat from "./components/chat/Chat";
import Server from "./components/server/Server";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="servers" element={<Server />}>
            <Route index element={<Navigate to="@me" />} />
            <Route path="@me" element={<ServerPlace />}>
              <Route index element={<Chat />} />
              <Route path=":channelId" element={<Chat />} />
            </Route>
            <Route path=":serverId" element={<ServerPlace />}>
              <Route index element={<Chat />} />
              <Route path=":channelId" element={<Chat />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
