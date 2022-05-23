import React from "react";
import Message from "../message/Message";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Messages({ conversations, currentUserId }) {
  return (
    <ScrollToBottom className="chat__messages">
      {conversations.map((conversation) => (
        <Message
          key={conversation._id}
          currentUserId={currentUserId}
          conversation={conversation}
        />
      ))}
    </ScrollToBottom>
  );
}
