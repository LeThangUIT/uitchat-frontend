import React, { useEffect, useState } from "react";
import "./Chat.css";
import Member from "./member/Member";
import ChatHeader from "./chatHeader/ChatHeader";
import Messages from "../messages/Messages";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInfoChannelData,
  selectInfoChannel,
} from "../../features/infoChannelSlice";
import { fetchChannelData } from "../../features/channelSlice";
import {
  fetchConversationData,
  fetchAddNewConversation,
  selectConversation,
  addNewConversationFromSocket,
} from "../../features/conversationSlice";

import io from "socket.io-client";

let socket;

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channelId, serverId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const channel = useSelector(selectInfoChannel);
  const [message, setMessage] = useState("");
  const conversations = useSelector(selectConversation);
  // const [messages, setMessages] = useState(conversations);

  const currentUserId = currentUser.id;
  const END_POINT = "http://localhost:8000";

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    socket = io(END_POINT, { query: { userId: currentUserId } });

    return () => socket.close();
  }, [currentUser]);

  useEffect(() => {
    if (channelId) {
      dispatch(fetchInfoChannelData(channelId, serverId));
      dispatch(fetchConversationData(channelId));
    } else {
      Promise.resolve(dispatch(fetchChannelData(serverId))).then((value) => {
        let firstChannelId = value.payload[0]._id;
        navigate(`${firstChannelId}`);
      });
    }
  }, [serverId, channelId]);

  useEffect(() => {
    socket.emit("join-channel", channelId);
  }, [channelId]);

  useEffect(() => {
    socket.on("receive-message", (mes) => {
      dispatch(addNewConversationFromSocket(mes));
    });

    return () => socket.off("receive-message");
  });

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      let channelId = channel._id;
      let content = message;
      socket.emit("send-message", { channelId, content });

      setMessage("");
    }
  };

  return (
    <div className="chat">
      <ChatHeader channel={channel} />
      <div className="chat__messAndMem">
        <div className="chat__mess">
          <Messages
            conversations={conversations}
            currentUserId={currentUserId}
          />
          <div className="chat__input">
            <AddCircleIcon fontSize="large" />
            <div className="form">
              <input
                type="text"
                placeholder={`Message #${channel.name}`}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
              />
            </div>
            <div className="chat__inputIcons">
              <CardGiftcardIcon />
              <GifBoxIcon />
              <EmojiEmotionsIcon />
            </div>
          </div>
        </div>
        <Member channel={channel} />
      </div>
    </div>
  );
}

export default Chat;
