import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import "./ChatMeSidebar.css";

export default function ChatMeSidebar() {
  const notifications = [
    {
      senderName: "vinh",
      serverName: "socket",
    },
    {
      senderName: "tran",
      serverName: "ie213",
    },
  ];

  return (
    <div className="chatMeSidebar">
      <h4 className="chatMeSidebar__status">Notifications</h4>
      <div className="chatMeSidebar__notify">
        {notifications.map((n) => {
          return (
            <Card
              sx={{
                mb: "0.5rem",
                backgroundColor: "black",
              }}
            >
              <CardContent
                sx={{
                  color: "white",
                }}
              >
                <b>{n.senderName}</b> invites you join <b>{n.serverName}</b>{" "}
                server
              </CardContent>
              <CardActions>
                <Button>Accept</Button>
                <Button>Reject</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
