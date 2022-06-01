import { Avatar, Tooltip, tooltipClasses } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import {
  deleteServerFromSocket,
  fetchServerData,
  selectServer,
  updateServerFromSocket,
  addNewServerFromSocket,
} from "../../features/serverSlice";
import { selectSocket, socketAddListener } from "../../features/socketSlice";
import AddServer from "./AddServer";
import "./Server.css";
import { styled } from "@mui/material/styles";
import { leaveServerFromSocket } from "../../features/memberSlice";

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
  const socket = useSelector(selectSocket);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchServerData());
    }
  }, []);

  useEffect(() => {
    if (socket) {
      const updatedServer = {
        name: "updated-server",
        callback: (server) => {
          dispatch(updateServerFromSocket(server));
        },
      };
      dispatch(socketAddListener(updatedServer));
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const acceptedInvite = {
        name: "accepted-invite",
        callback: (server) => {
          dispatch(addNewServerFromSocket(server));
        },
      };
      dispatch(socketAddListener(acceptedInvite));

      const deletedServer = {
        name: "deleted-server",
        callback: (serverId) => {
          dispatch(deleteServerFromSocket(serverId));
        },
      };
      dispatch(socketAddListener(deletedServer));

      const leftServer = {
        name: "left-server",
        callback:({serverId, userId}) => {
          console.log(userId, serverId)
          if(userId === currentUser.id) {
            dispatch(deleteServerFromSocket(serverId));
          } else {
            console.log("first");
            dispatch(leaveServerFromSocket(userId));
          }
        },
      };
      dispatch(socketAddListener(leftServer));
    }
  }, [socket]);

  return (
    currentUser && (
      <div className="flexColumn">
        <div className="server">
          <div className="server__home">
            <Avatar
              onClick={() => {
                navigate("/servers/@me");
              }}
              sx={{ width: "50px", height: "50px" }}
              className="server__logo"
              src="https://i.imgur.com/17s9LBz.png"
            />
          </div>
          <div className="server__servers">
            {servers.map((server) => {
              return (
                <div key={server._id} className="server__server">
                  <BootstrapTooltip title={server.name} placement="right" arrow>
                    <Link
                      to={`${server._id}`}
                      style={{ textDecoration: "none" }}
                    >
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
    )
  );
}
export default Server;
