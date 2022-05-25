import EditMessage from "../editMessage/EditMessage";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { socketEmitEvent } from "../../features/socketSlice";

import "./Message.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const Message = ({ message, currentUserId }) => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState(message.content);

  const own = currentUserId == message.userId;
  const deleted = message.deleted;

  const editMessage = () => {
    const event = {
      name: "update-message",
      data: {
        messageId: message._id,
        channelId,
        content: msg,
      },
    };
    dispatch(socketEmitEvent(event));
    setEditing(false);
  };

  return (
    <div className={own ? "message own" : "message"}>
      <Avatar
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/discord-app-5acff.appspot.com/o/image%20taolavinh%40gmail.com?alt=media&token=0ef2c78b-8349-49ae-9fc1-5800189aaf97"
      />

      {deleted ? (
        <div className="messageText">'Message was deleted'</div>
      ) : (
        <>
          <div className="messageText">
            {editing ? (
              <input
                type="text"
                style={{ border: 0 }}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && editMessage()}
              />
            ) : (
              message.content
            )}
          </div>
          {message.createdAt !== message.updatedAt && <div>(Edited)</div>}
          {own && (
            <EditMessage
              own={own}
              messageId={message._id}
              setEditing={setEditing}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Message;
