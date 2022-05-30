import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectInfoServer } from "../../features/infoServerSlice";
import { selectChannel } from "../../features/channelSlice";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditServer from "../editServer/EditServer";
import AddChannel from "../addChannel/AddChannel";
import { NavLink } from "react-router-dom";
import ChannelList from "../channelList/ChannelList";

export default function ChannelSidebar({ currentUser }) {
  const infoServer = useSelector(selectInfoServer);
  const channels = useSelector(selectChannel);

  return (
    <>
      <div className="sidebar__top">
        <h4>{infoServer.name}</h4>
        <EditServer />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <KeyboardArrowDownIcon />
            <h5>Public channel</h5>
          </div>
          <AddChannel dataFromParent={currentUser} serverId={infoServer._id} />
        </div>

        <div className="sidebar__channelsList">
          {channels
            .filter((channel) => channel.isPublic == true)
            .map((channel) => (
              <NavLink
                key={channel._id}
                to={channel._id}
                style={({ isActive }) => {
                  return {
                    textDecoration: "none",
                    color: isActive ? "white" : "gray",
                  };
                }}
              >
                <ChannelList dataFromParent={channel} />
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
}
