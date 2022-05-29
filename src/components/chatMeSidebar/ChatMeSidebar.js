import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  fetchInviteData,
  addNewInviteFromSocket,
  removeInviteFromSocket,
  selectInvite,
} from "../../features/inviteSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactData, selectContact } from "../../features/contactSlice";
import {
  selectSocket,
  socketAddListener,
  socketEmitEvent,
} from "../../features/socketSlice";

import "./ChatMeSidebar.css";

export default function ChatMeSidebar() {
  const invites = useSelector(selectInvite);
  const contacts = useSelector(selectContact);
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactData());
    dispatch(fetchInviteData());
  }, []);

  useEffect(() => {
    if (socket) {
      const sendInviteEvent = {
        name: "send-invite",
        callback: (invite) => {
          dispatch(addNewInviteFromSocket(invite));
        },
      };
      dispatch(socketAddListener(sendInviteEvent));

      const removeInviteEvent = {
        name: "remove-invite",
        callback: (inviteId) => {
          dispatch(removeInviteFromSocket(inviteId));
        },
      };
      dispatch(socketAddListener(removeInviteEvent));
    }
  }, [socket]);

  const handleAccept = (inviteId, serverId) => {
    const event = {
      name: "accept-invite",
      data: {
        inviteId,
        serverId,
      },
    };
    dispatch(socketEmitEvent(event));
  };

  const handleReject = (inviteId) => {
    const event = {
      name: "reject-invite",
      data: {
        inviteId,
      },
    };
    dispatch(socketEmitEvent(event));
  };

  return (
    <div className="chatMeSidebar">
      <h4 className="chatMeSidebar__status">Notifications</h4>
      <div className="chatMeSidebar__invites">
        {invites.map((invite) => {
          // console.log(invite);
          return (
            <div key={invite._id} className="card__container">
              <Card
                sx={{
                  mb: "0.5rem",
                  backgroundColor: "black",
                }}
              >
                <CardContent
                  sx={{
                    color: "white",
                    maxWidth: "12rem",
                  }}
                >
                  <b>{invite.senderId.name}</b> invites you join{" "}
                  <b>{invite.serverId.name}</b> server
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() =>
                      handleAccept(invite._id, invite.serverId._id)
                    }
                  >
                    Accept
                  </Button>
                  <Button onClick={() => handleReject(invite._id)}>
                    Reject
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
