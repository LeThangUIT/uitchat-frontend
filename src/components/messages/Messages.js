import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMessageFromSocket,
  deleteMessageFromSocket,
} from "../../features/conversationSlice";
import { selectSocket, socketAddListener } from "../../features/socketSlice";
import Message from "../message/Message";

import "./Messages.css";

export default function Messages({ messages, currentUserId }) {
  const dispatch = useDispatch();
  const socket = useSelector(selectSocket);

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView(false);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      const deletedMessageEvent = {
        name: "deleted-message",
        callback: (msgId) => {
          dispatch(deleteMessageFromSocket(msgId));
        },
      };
      const updatedMessageEvent = {
        name: "updated-message",
        callback: (msg) => {
          dispatch(updateMessageFromSocket(msg));
        },
      };
      dispatch(socketAddListener(deletedMessageEvent));
      dispatch(socketAddListener(updatedMessageEvent));
    }
  }, [socket]);

  return (
    <div className="messages">
      <div className="messages__container">
        {messages.map((message, index) => (
          <div
            ref={messages.length - 1 === index ? setRef : null}
            key={message._id}
          >
            <Message currentUserId={currentUserId} message={message} />
          </div>
        ))}
      </div>
    </div>
  );
}
