import React, { useEffect } from "react";
import { Avatar } from "@mui/material";

import "./ChatServerSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket, socketAddListener } from "../../features/socketSlice";
import { useParams } from "react-router-dom";
import {
  addNewMemberFromSocket,
  fetchInfoChannelData,
  selectInfoChannel,
} from "../../features/infoChannelSlice";

function ChatServerSidebar() {
  const socket = useSelector(selectSocket);
  const { channelId, serverId } = useParams();
  const channel = useSelector(selectInfoChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInfoChannelData(channelId, serverId));
  }, []);

  useEffect(() => {
    if (socket) {
      const userJoinChannelEvent = {
        name: "user-join-channel",
        callback: (user) => {
          dispatch(addNewMemberFromSocket(user));
        },
      };
      dispatch(socketAddListener(userJoinChannelEvent));
    }
  }, [socket]);

  return (
    <div className="chatServerSidebar">
      <h4 className="chatServerSidebar__status">Owners</h4>
      <div className="chatServerSidebar__users">
        {channel &&
          "ownerIds" in channel &&
          channel.ownerIds.map((owner) => (
            <li key={owner._id} className="chatServerSidebar__user user__on">
              <Avatar src={owner.avatar} />
              <h4>{owner.name}</h4>
            </li>
          ))}
      </div>
      <h4 className="chatServerSidebar__status">Members</h4>
      <div className="chatServerSidebar__users">
        {channel &&
          "memberIds" in channel &&
          channel.memberIds.map((member) => (
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
