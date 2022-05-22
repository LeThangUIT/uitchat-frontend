import React, { useEffect, useLayoutEffect, useState } from "react";
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
  fetchInfoServerData,
  selectInfoServer,
} from "../../features/infoServerSlice";
import {
  fetchInfoChannelData,
  selectInfoChannel,
} from "../../features/infoChannelSlice";
import { fetchChannelData, selectChannel } from "../../features/channelSlice";
import { fetchConversationData } from "../../features/conversationSlice";
import axios from "axios";

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channelId, serverId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const channel = useSelector(selectInfoChannel);
  const [message, setMessage] = useState([])
  const [newMessage, setNewMessage] = useState("")


  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    if (channelId) {
      dispatch(fetchInfoChannelData(channelId, serverId));
    } else {
      Promise.resolve(dispatch(fetchChannelData(serverId))).then((value) => {
        let firstChannelId = value.payload[0]._id;
        dispatch(fetchInfoChannelData(firstChannelId, serverId));
      });
    }
  }, [channelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      // channelId: currentChat._id,
    }

    try{
      const res = await axios.post(`${API_URL}/messages/channel`,message)
      setMessage(...message, res.data)
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="chat">
      <ChatHeader channel={channel} />
      <div className="chat__messAndMem">
        <div className="chat__mess">
          <div className="chat__messages">
            <Message />
          </div>
          <div className="chat__input">
            <AddCircleIcon fontSize="large" />
            <form action="">
              <input placeholder={`Message #Channel Name`} className="chatMessage" onChange={(e) => setMessage(e.target.value)} value={newMessage}/>
              <button className="chat__inputButton" type="submit" onClick={handleSubmit}>
                Send
              </button>
            </form>
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
