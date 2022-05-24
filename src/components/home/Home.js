// // import React, { useEffect } from "react";
// // import Server from "../server/Server";
// // import { useNavigate, Outlet } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // function Home() {
// //   const { user: currentUser } = useSelector((state) => state.auth);
// //   let navigate = useNavigate();
// //   useEffect(() => {
// //     if (!currentUser) {
// //       navigate("/login");
// //     }
// //   }, [currentUser]);
// //   return (
// //     <div className="home">
// //       home page
// //       <Outlet />
// //     </div>
// //   );
// // }

// // export default Home;

// import React, { useContext, useEffect, useState } from 'react'
// import Server from '../server/Server'
// import { useNavigate, Outlet } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { Avatar } from '@mui/material'
// import Conversation from '../conversations/Conversation'
// import './Home.css'
// import Message from '../chat/message/Message';
// import axios from 'axios';
// // import { io } from 'socket.io-client';
// import ComboBox from '../conversations/SearchUser'

// function Home() {
//   const { user: currentUser } = useSelector((state) => state.auth);
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [socket, setSocket] = useState("");
//   let navigate = useNavigate()
//   useEffect(() => {
//     if (!currentUser) {
//       navigate('/login')
//     }
//   }, [currentUser])

//   useEffect(() => {
//     if (!'6285b24ec49775b985975ccf') {
//       navigate('')
//     }
//   }, [])

//   return (
//     <>
//       <div className='home'>
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <ComboBox />

//             {/* {conversations.map((c) => (
//               <Conversation conversations={c} currentUser={currentUser} />
//             ))} */}
//             <Conversation />
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             <div className="chatBoxTop">
//               <Message />
//               <Message own={true} />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//               <Message />
//             </div>
//             <div className="chatBoxBottom">
//               <textarea className="chatMessageInput" placeholder="write something..."></textarea>
//               <button className="chatSubmitButtom">Send</button>
//             </div>
//           </div>
//         </div>
//         <div className="chatActive">
//           <div className="chatActiveWrapper">
//             Online
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

<<<<<<< HEAD:src/component/home/Home.js
// export default Home
=======
// export default Home;


import React, { useContext, useEffect, useState } from 'react'
import Server from '../server/Server'
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Avatar } from '@mui/material'
import Conversation from '../conversations/Conversation'
import './Home.css'
import Message from '../chat/message/Message';
import axios from 'axios';
// import { io } from 'socket.io-client';
import ComboBox from '../conversations/SearchUser'

function Home() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  let navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser])

  useEffect(() => {
    if (!'6285b24ec49775b985975ccf') {
      navigate('')
    }
  }, [])

  const sendMessage = async () => {
    if (currentMessage !== "") {
        const messageData = {
            room: conversations,
            author: currentUser.name,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        };

        // await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
    }
};

  return (
    <>
      <div className='home'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <ComboBox />       
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="write something..."></textarea>
              <button className="chatSubmitButtom" onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
        <div className="chatActive">
          <div className="chatActiveWrapper">
            Online
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
>>>>>>> bff9944106ee74c4464df1a3dbe7725f0c03e434:src/components/home/Home.js
