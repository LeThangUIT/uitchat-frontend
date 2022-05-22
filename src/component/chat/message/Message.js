// import { Avatar } from '@mui/material'
// import React from 'react'
// import './Message.css'
// function Message() {
//   return (
//     <div className='message'>
//         <Avatar/>
//         <div className="message__info">
//             <h4>
//                 Thang
//                 <span className='message__timestamp'>1/10/2001</span>
//             </h4>
//             <p>This is message</p>
//         </div>
//     </div>

//   )
// }

// export default Message

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { fetchMessageChannelData, selectMessage, fetchMessageConversationData } from '../../../features/messageGetSlice';
import { selectConversation } from "../../../features/conversationSlice";
import moment from "moment";
import "./Message.css";

function Message({ message, own }) {
  const messages = useSelector(selectMessage);
  const conversations = useSelector(selectConversation);
  const channelId = useParams().channelId;
  // const channel = useSelector(selectConversation);
  console.log(conversations)

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchMessageChannelData(channelId)).unwrap().then(data => {
  //     return data
  //   }).catch(err => console.log(err))
  // }, [])

  // useEffect(() => {
  //   dispatch(fetchMessageConversationData(conversationId)).unwrap().then(data => {
  //     return data
  //   }).catch(err => console.log(err))
  // }, [])

  return (
    <div>
      {conversations.map((msg) => (
        <div key={msg._id} className={own ? "message own" : "message"}>
          <div className="messageTop">
            <img className="messageImg" src="" alt="" />
            <div className="messageText">{msg.content}</div>
          </div>
          <div className="messageBot">{moment(msg.createdAt).calendar()}</div>
        </div>
      ))}
    </div>
  );
}

export default Message;
