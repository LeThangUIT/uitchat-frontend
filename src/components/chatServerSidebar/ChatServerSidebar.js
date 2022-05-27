import React from "react";
import { Avatar } from "@mui/material";

import "./ChatServerSidebar.css";

function ChatServerSidebar({ channel }) {
  return (
    <div className="chatServerSidebar">
      <h4 className="chatServerSidebar__status">Owners</h4>
      <div className="chatServerSidebar__users">
        {channel &&
          "ownerIds" in channel &&
          channel.ownerIds.map((owner) => (
            <li key={owner._id} className="chatServerSidebar__user user__on">
              <Avatar />
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
              <Avatar />
              <h4>{member.name}</h4>
            </li>
          ))}
      </div>
    </div>
  );
}

export default ChatServerSidebar;
