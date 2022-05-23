import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";

import "./ServerPlace.css";

function ServerPlace(props) {
  const { serverId } = useParams();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <div className="serverPlace">
      <Sidebar serverId={serverId} />
      <Outlet context={[messages, setMessages]} />
    </div>
  );
}
export default ServerPlace;
