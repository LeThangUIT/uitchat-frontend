import { Avatar, Tooltip, tooltipClasses } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import {
  deleteServerFromSocket,
  fetchServerData,
  selectServer,
  updateServerFromSocket,
} from "../../features/serverSlice";
import { socketAddListener } from "../../features/socketSlice";
import AddServer from "./AddServer";
import "./Server.css";
import { styled } from '@mui/material/styles';


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 18,
    padding: 16,
  },
}));

function Server() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const servers = useSelector(selectServer);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchServerData());
  }, []);

  useEffect(() => {
    const updatedServer = {
      name: "updated-server",
      callback: (server) => {
        dispatch(updateServerFromSocket(server));
      },
    };
    dispatch(socketAddListener(updatedServer));
  }, []);

  useEffect(() => {
    const deleteServer = {
      name: "deleted-server",
      callback: (serverId) => {
        dispatch(deleteServerFromSocket(serverId))
      }
    }
    dispatch(socketAddListener(deleteServer));
  }, [])

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
                  <BootstrapTooltip title={server.name} placement="right" arrow>
                    <Link to={`${server._id}`} style={{ textDecoration: "none" }}>
                      <Avatar
                        src={server.avatar}
                        sx={{ width: "50px", height: "50px" }}
                        className="server__avt"
                      />
                    </Link>
                  </BootstrapTooltip>
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
