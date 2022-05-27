import React, { useEffect, useState } from "react";
import ChatServerSidebar from "../chatServerSidebar/ChatServerSidebar";
import ChatHeader from "./chatHeader/ChatHeader";
import Messages from "../messages/Messages";
import ChatInput from "../chatInput/ChatInput";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInfoChannelData,
  selectInfoChannel,
} from "../../features/infoChannelSlice";
import { fetchChannelData } from "../../features/channelSlice";
import {
  fetchConversationData,
  selectConversation,
  selectInputMessages,
  addNewMessageFromSocket,
} from "../../features/conversationSlice";
import {
  socketAddListener,
  socketEmitEvent,
  selectSocket,
} from "../../features/socketSlice";

import "./Chat.css";
import ChatMeSidebar from "../chatMeSidebar/ChatMeSidebar";

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channelId, serverId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const channel = useSelector(selectInfoChannel);
  const conversation = useSelector(selectConversation);
  const inputMessages = useSelector(selectInputMessages);
  const oldInputMessage = inputMessages.find(
    (inputMessage) => inputMessage.channelId === channelId
  );
  const [message, setMessage] = useState("");
  const socket = useSelector(selectSocket);

  const currentUserId = currentUser.id;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    if (channelId) {
      dispatch(fetchInfoChannelData(channelId, serverId));
      dispatch(fetchConversationData(channelId));
    } else if (serverId) {
      Promise.resolve(dispatch(fetchChannelData(serverId))).then((value) => {
        let firstChannelId = value.payload[0]._id;
        navigate(`${firstChannelId}`);
      });
    }
    setMessage(oldInputMessage ? oldInputMessage.message : "");
  }, [serverId, channelId]);

  // ================ Socket.io ==================

  useEffect(() => {
    if (socket) {
      const event = {
        name: "join-channel",
        data: {
          channelId,
        },
      };
      dispatch(socketEmitEvent(event));
    }
  }, [channelId, socket]);

  useEffect(() => {
    if (socket) {
      const receiveMessageEvent = {
        name: "receive-message",
        callback: (msg) => {
          dispatch(addNewMessageFromSocket(msg));
        },
      };
      dispatch(socketAddListener(receiveMessageEvent));
    }
  }, [socket]);

  // ============================================

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      const event = {
        name: "send-message",
        data: {
          channelId,
          content: message,
        },
      };
      dispatch(socketEmitEvent(event));

      setMessage("");
    }
  };

  return (
    <div className="chat">
      <ChatHeader channel={channel} />
      <div className="chat__messAndMem">
        <div className="chat__mess">
          <Messages messages={conversation} currentUserId={currentUserId} />
          <ChatInput
            channel={channel}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        {serverId ? <ChatServerSidebar channel={channel} /> : <ChatMeSidebar />}
      </div>
    </div>
  );
}

export default Chat;
