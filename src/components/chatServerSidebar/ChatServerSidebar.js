import React, { useEffect } from "react";
import { Avatar } from "@mui/material";

import "./ChatServerSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket, socketAddListener, socketRemoveListener } from "../../features/socketSlice";
import { useParams } from "react-router-dom";
import { selectInfoServer } from "../../features/infoServerSlice";
import { fetchMemberData, selectMember, addNewMemberFromSocket } from "../../features/memberSlice";

function ChatServerSidebar() {
  const socket = useSelector(selectSocket);
  const server = useSelector(selectInfoServer);
  const members = useSelector(selectMember);
  const { serverId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemberData(serverId));
  }, [serverId]);

  useEffect(() => {
    if (socket) {
      const userJoinServerEvent = {
        name: "user-join-server",
        callback: (user) => {
          dispatch(addNewMemberFromSocket(user));
        },
      };
      dispatch(socketAddListener(userJoinServerEvent));
      return () => {
        dispatch(socketRemoveListener("send-invite"));
        dispatch(socketRemoveListener("remove-invite"));
      };
    }
  }, [socket]);

  return (
    <div className="chatServerSidebar">
      <h4 className="chatServerSidebar__status">Owners</h4>
      <div className="chatServerSidebar__users">
        {server &&
          "ownerIds" in server &&
          server.ownerIds.map((owner) => (
            <li key={owner._id} className="chatServerSidebar__user user__on">
              <Avatar src={owner.avatar} />
              <h4>{owner.name}</h4>
            </li>
          ))}
      </div>
      <h4 className="chatServerSidebar__status">Members</h4>
      <div className="chatServerSidebar__users">
        {members.map((member) => (
          <li key={member._id} className="chatServerSidebar__user user__on">
            <Avatar src={member.avatar} />
            <h4>{member.name}</h4>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ChatServerSidebar;
