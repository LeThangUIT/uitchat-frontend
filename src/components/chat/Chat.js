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
  addInputMessage,
} from "../../features/conversationSlice";
import {
  socketAddListener,
  socketEmitEvent,
  selectSocket,
  socketRemoveListener,
} from "../../features/socketSlice";
import ChatMeSidebar from "../chatMeSidebar/ChatMeSidebar";

import "./Chat.css";
import { fetchContactData, selectContact } from "../../features/contactSlice";
import { fetchInfoContactData } from "../../features/infoContactSlice";

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channelId, serverId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const channel = useSelector(selectInfoChannel);
  const contact = useSelector(selectContact);
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
    if (channelId && serverId) {
      dispatch(fetchInfoChannelData(channelId, serverId));
      dispatch(fetchChannelData(serverId));
      dispatch(fetchConversationData(channelId));
    } else if (!channelId && serverId) {
      Promise.resolve(dispatch(fetchChannelData(serverId))).then((value) => {
        let firstChannelId = value.payload[0]._id;
        navigate(`${firstChannelId}`);
      });
    } else if (channelId && !serverId) {
      dispatch(fetchInfoContactData(channelId));
      dispatch(fetchConversationData(channelId));
    } else if (!channelId & !serverId) {
      Promise.resolve(dispatch(fetchContactData())).then((value) => {
        let firstContactId = value.payload[0]._id;
        navigate(`${firstContactId}`);
      });
    }
    setMessage(oldInputMessage ? oldInputMessage.message : "");
  }, [serverId, channelId]);

  // ================ Socket.io ==================

  useEffect(() => {
    if (socket) {
      const joinChannelEvent = {
        name: "join-channel",
        data: {
          channelId,
        },
      };
      dispatch(socketEmitEvent(joinChannelEvent));
      return () => {
        const leaveChannelEvent = {
          name: "leave-channel",
          data: {
            channelId,
          },
        };
        dispatch(socketEmitEvent(leaveChannelEvent));
      };
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
      return () => {
        dispatch(socketRemoveListener("receive-message"));
      };
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
      dispatch(addInputMessage({ channelId, message: "" }));
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <ChatHeader channel={channel} />
      <div className="chat__messageAndSidebar">
        <div className="chat__message">
          <Messages messages={conversation} currentUserId={currentUserId} />
          <ChatInput
            message={message}
            currentUserId={currentUserId}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <div className="chat__sidebar">
          {serverId ? <ChatServerSidebar /> : <ChatMeSidebar />}
        </div>
      </div>
    </div>
  );
}

export default Chat;
