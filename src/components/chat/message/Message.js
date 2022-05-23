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

// import { useSelector } from "react-redux";
// import { selectConversation } from "../../../features/conversationSlice";
// import moment from "moment";
// import "./Message.css";
// import ConversationMessage from '../../conversations/ConversationMessage'

// function Message({ message }) {
//   const conversations = useSelector(selectConversation);

//   return (
//     <div>
//       {conversations.map((msg) => (
//         <div key={msg._id} className={own ? "message own" : "message"}>
//           <div className="messageTop">
//             <img className="messageImg" src="" alt="" />
//             <div className="messageText">{msg.content}</div>
//           </div>
//           <div className="messageBot">{moment(msg.createdAt).calendar()}</div>
//         </div>
//       ))}
//     </div>
//   );
// }
import "./Message.css";

const Message = ({ conversation }) => {
  const own = false;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src="" alt="" />
        <div className="messageText">{conversation.content}</div>
      </div>
    </div>
  );
};

export default Message;
