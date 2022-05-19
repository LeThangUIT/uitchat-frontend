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

import './Message.css'

function Message({own}) {
  return (
    <div className={own ? "message own": "message"}>
        <div className="messageTop">
          <img className="message" src="" alt="" />
          <p className="messageText"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message