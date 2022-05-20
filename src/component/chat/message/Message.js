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

import { useSelector } from 'react-redux'
import './Message.css'
import { selectConversation } from '../../../features/conversationSlice'
// import ConversationMessage from '../../conversations/ConversationMessage'

function Message({own}) {
  const conversations = useSelector(selectConversation)
 
  return (
    <div className={own ? "message own": "message"}>
        <div className="messageTop">
          <img className="message" src="" alt="" />
          <p className="messageText"> 
           {conversations.map((conversation) => (
             <div>
              <h3> {conversation.content} </h3> 
              <div className="messageBottom">{conversation.createdAt}</div>
              </div>
            ))}
             </p>
        </div>
       
    </div>
  )
}

export default Message