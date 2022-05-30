import EditMessage from "../editMessage/EditMessage";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { useState } from "react";
import { socketEmitEvent } from "../../features/socketSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";

import "./Message.css";

const Message = ({ message, currentUserId }) => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState(message.content);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const own = currentUserId === message.userId._id;
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
    <div
      className={own ? "message own" : "message"}
      onMouseEnter={() => setShowEditBtn(true)}
      onMouseLeave={() => setShowEditBtn(false)}
    >
      <Avatar alt={message.userId.name} src={message.userId.avatar} />

      {deleted ? (
        <Tooltip
          title={moment(message.updatedAt).calendar()}
          placement="bottom"
        >
          <div className="messageText">'Message was deleted'</div>
        </Tooltip>
      ) : (
        <>
          <Tooltip
            title={moment(message.updatedAt).calendar()}
            placement="bottom"
          >
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
          </Tooltip>
          {message.createdAt !== message.updatedAt && (
            <div className="messageText__edit">(Edited)</div>
          )}
          {own && showEditBtn && (
            <EditMessage
              own={own.toString()}
              setShowEditBtn={setShowEditBtn}
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
