import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchConversationData } from "../../features/conversationSlice";

import "./Conversation.css";

function SidebarHome() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation.data);
  const receiverId = useParams().receiverId;

  let navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchConversationData(receiverId))
    //   .unwrap()
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className="conversation">
      <img className="conversationImg" src="" alt="" />
      <span className="conversationName">
        {/* <h2>{conversation[0]?.user[0].name}</h2> */}
        {/* <h2>test</h2> */}
      </span>
    </div>
  );
}

export default SidebarHome;
