import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import EditServer from "./EditServer";
import SidebarHome from "../conversations/SidebarHome";
import SearchUser from "../conversations/SearchUser";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallIcon from "@mui/icons-material/Call";
import { Avatar } from "@mui/material";
import SidebarChannel from "./SidebarChannel";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { selectChannel } from "../../features/channelSlice";
import { selectInfoServer } from "../../features/infoServerSlice";
import { fetchInfoServerData } from "../../features/infoServerSlice";
import { fetchChannelData } from "../../features/channelSlice";

import AddChannel from "../addChannel/AddChannel";

import "./Sidebar.css";

function Sidebar(props) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channels = useSelector(selectChannel);
  const infoServer = useSelector(selectInfoServer);
  const serverId = props.serverId;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  useEffect(() => {
    dispatch(fetchInfoServerData(serverId));
    dispatch(fetchChannelData(serverId));
  }, [serverId]);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {serverId ? (
          <>
            <h4>{infoServer.name}</h4>
            <EditServer />
          </>
        ) : (
          <SearchUser />
        )}
      </div>
      <div className="sidebar__channels">
        {serverId && (
          <div className="sidebar__channelsHeader">
            <div className="sidebar__header">
              <KeyboardArrowDownIcon />
              <h5>Public channel</h5>
            </div>
            <AddChannel dataFromParent={currentUser} serverId={serverId} />
          </div>
        )}
        <div className="sidebar__channelsList">
          {serverId ? (
            channels.map((channel) => (
              <Link
                key={channel._id}
                to={channel._id}
                style={{ textDecoration: "none" }}
              >
                <SidebarChannel key={channel._id} dataFromParent={channel} />
              </Link>
            ))
          ) : (
            <SidebarHome />
          )}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h4>Voice connected</h4>
          <p>Play game</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
<<<<<<< HEAD:src/component/sidebar/Sidebar.js
        {/* {console.log(currentUser)}
        <Avatar src={currentUser.user.avatar} /> */}
=======
        <Avatar src={currentUser.user.avatar} />
>>>>>>> fb7d7e8b6ec99928f5648e90775041a408eded9b:src/components/sidebar/Sidebar.js
        <div className="sidebar__profileInfo">
          <h5>{currentUser.user.name}</h5>
          <p>#{currentUser.access_token.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon className="sidebar__profileIcon" />
          <HeadsetIcon className="sidebar__profileIcon" />
          <Link to={"/profile"} className="sidebar__profileIcon">
            <SettingsIcon className="setting__Icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
