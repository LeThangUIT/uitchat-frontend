import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import {
  socketEmitEvent,
  socketConnect,
  socketClose,
} from "../../features/socketSlice";

import "./ServerPlace.css";

function ServerPlace() {
  const { serverId } = useParams();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(socketConnect(currentUser.id));
      return () => {
        dispatch(socketClose());
      };
    }
  }, [currentUser]);

  useEffect(() => {
    const event = {
      name: "join-server",
      data: {
        serverId,
      },
    };
    dispatch(socketEmitEvent(event));
  }, [serverId]);

  return (
    <div className="serverPlace">
      <Sidebar serverId={serverId} />
      <Outlet context={[messages, setMessages]} />
    </div>
  );
}
export default ServerPlace;
