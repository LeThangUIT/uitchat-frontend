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
  selectConversation,
  selectInputMessages,
  addInputMessage,
  addNewMessageFromSocket,
} from "../../features/conversationSlice";

import {
  socketAddListener,
  socketEmitEvent,
  selectSocket,
} from "../../features/socketSlice";

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
          <div className="chat__input">
            <AddCircleIcon fontSize="large" />
            <div className="form">
              <input
                type="text"
                placeholder={`Message #${channel.name}`}
                value={message}
                onChange={(e) => {
                  let val = e.target.value;
                  dispatch(addInputMessage({ channelId, message: val }));
                  setMessage(val);
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
