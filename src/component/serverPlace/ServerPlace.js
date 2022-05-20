import React, { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../sidebarHome/SidebarHome";
import Sidebar from "../sidebar/Sidebar";

import "./ServerPlace.css";

function ServerPlace(props) {
  const { serverId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <div className="serverPlace">
      {serverId ? <Sidebar serverId={serverId} /> : <Home />}
      <Outlet />
    </div>
  );
}
export default ServerPlace;
