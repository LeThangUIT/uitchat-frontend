import React, { useEffect, useState } from "react";
import "./Chat.css";
import Member from "./member/Member";
import ChatHeader from "./chatHeader/ChatHeader";
import Message from "./message/Message";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../app/constant";
import {
  fetchInfoChannelData,
  selectInfoChannel,
} from "../../features/infoChannelSlice";
import { fetchChannelData, selectChannel } from "../../features/channelSlice";
import {
  fetchConversationData,
  fetchAddNewConversation,
  selectConversation,
} from "../../features/conversationSlice";

import ScrollToBottom from "react-scroll-to-bottom";

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channelId, serverId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const channel = useSelector(selectInfoChannel);
  const [message, setMessage] = useState("");
  const conversations = useSelector(selectConversation);

  const currentUserId = currentUser.user.id;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    if (channelId) {
      dispatch(fetchInfoChannelData(channelId, serverId));
      dispatch(fetchConversationData(channelId));
    } else {
      Promise.resolve(dispatch(fetchChannelData(serverId))).then((value) => {
        let firstChannelId = value.payload[0]._id;
        dispatch(fetchInfoChannelData(firstChannelId, serverId));
      });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      dispatch(
        fetchAddNewConversation({ channelId: channel._id, content: message })
      );
      setMessage("");
    }
  };
  return (
    <div className="chat">
      <ChatHeader channel={channel} />
      <div className="chat__messAndMem">
        <div className="chat__mess">
          <ScrollToBottom className="chat__messages">
            {conversations.map((conversation) => (
              <Message
                key={conversation._id}
                currentUserId={currentUserId}
                conversation={conversation}
              />
            ))}
          </ScrollToBottom>
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
