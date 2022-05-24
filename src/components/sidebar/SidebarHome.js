import { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import Conversation from "../conversations/Conversation";
import "./Sidebar.css";
import Message from "../chat/message/Message";
import axios from "axios";
// import { io } from 'socket.io-client';
import SearchUser from "../conversations/SearchUser";

function Home() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState("");
  let navigate = useNavigate();
  const guestId = useParams().guestId;
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);


  useEffect(() => {
    if (!guestId) {
      navigate("");
    }
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id)
        setMessages(res.data)
      } catch {
        // console.log(err);
      }
    }
    getMessages()
  }, [currentChat]);

  return (

    // <div className="home">
    //   <div className="chatMenu">
    //     <div className="chatMenuWrapper">
    //       <ComboBox />
    //       <Conversation />
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="sidebar">
        <div className="sidebar__top">
          <SearchUser />
        </div>
        <div className="sidebar__channels">
          <div className="sidebar__channelsList">
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {
            currentChat ?
              <div>

              </div> : <span className="noConversationText">Open a conversation to start a chat</span>
          }
        </div>
      </div>
    </>
    // <>
    //   <div className='home'>
    //     <div className="chatMenu">
    //       <div className="chatMenuWrapper">
    //         <ComboBox />
    //         <Conversation />
    //       </div>
    //     </div>
    //     <div className="chatBox">
    //       <div className="chatBoxWrapper">
    //           {/* <Outlet /> */}
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default Home;
