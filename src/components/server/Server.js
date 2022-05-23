import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { fetchServerData, selectServer } from "../../features/serverSlice";
import { selectChannel } from "../../features/channelSlice";
import "./Server.css";
import AddServer from "./AddServer";
import { fetchChannelData } from "../../features/channelSlice";
import { fetchInfoServerData } from "../../features/infoServerSlice";
import { fetchInfoChannelData } from "../../features/infoChannelSlice";

function Server() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const servers = useSelector(selectServer);
  const { user: currentUser } = useSelector((state) => state.auth);
  const channels = useSelector(selectChannel);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchServerData());
  }, []);

  return (
    <div className="flexColumn">
      <div className="server">
        <div className="server__home">
          <Avatar
            onClick={() => {
              navigate("/servers/@me");
            }}
            sx={{ width: "50px", height: "50px" }}
            className="server__avt"
            src="https://pngset.com/images/discord-icon-background-discord-logo-sphere-graphics-art-moon-transparent-png-792846.png"
          />
        </div>
        <div className="server__servers">
          {servers.map((server) => {
            return (
              <div key={server._id} className="server__server">
                <Link to={`${server._id}`} style={{ textDecoration: "none" }}>
                  <Avatar
                    src={server.avatar}
                    sx={{ width: "50px", height: "50px" }}
                    className="server__avt"
                  />
                </Link>
                <div className="hide">{server.name}</div>
              </div>
            );
          })}
        </div>
        <div className="server__footer">
          <AddServer dataFromParent={currentUser} />
        </div>
      </div>
      <div className="server__place">
        <Outlet />
      </div>
    </div>
  );
}
export default Server;