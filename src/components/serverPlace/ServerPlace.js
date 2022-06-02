import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import socketSlice, {
  socketEmitEvent,
  socketConnect,
  socketClose,
  socketAddListener,
  socketRemoveListener,
  selectSocket,
} from "../../features/socketSlice";

import "./ServerPlace.css";
import { addChannelFromSocket, deleteChannelFromSocket, editChannelFromSocket } from "../../features/channelSlice";

function ServerPlace() {
  const { serverId } = useParams();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector(selectSocket);
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

  useEffect(() => {
    if (socket) {
      const deletedChannelEvent = {
        name: "deleted-channel",
        callback: (channelId) => {
          dispatch(deleteChannelFromSocket(channelId));
          navigate(`/servers/${serverId}`);
        },
      };
      dispatch(socketAddListener(deletedChannelEvent));

      const addedChannelEvent = {
        name: "added-channel",
        callback: (channel) => {
          dispatch(addChannelFromSocket(channel));
        },
      };
      dispatch(socketAddListener(addedChannelEvent));

      const changedNameChannelEvent = {
        name: "changedName-channel",
        callback: (channel) => {
          dispatch(editChannelFromSocket(channel));
        },
      };
      dispatch(socketAddListener(changedNameChannelEvent));

      return () => {
        dispatch(socketRemoveListener("added-channel"));
      };
    }
  }, [socket]);

  return (
    <div className="serverPlace">
      <Sidebar serverId={serverId} />
      <Outlet context={[messages, setMessages]} />
    </div>
  );
}
export default ServerPlace;
