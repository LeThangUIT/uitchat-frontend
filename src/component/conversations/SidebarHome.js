import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { fetchConversationData } from "../../features/conversationSlice";

import "./Conversation.css";

function SidebarHome() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation.data);

  let navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConversationData("6285b24ec49775b985975ccf"))
      .unwrap()
      .then((data) => {
        return console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="conversation">
      <img className="conversationImg" src="" alt="" />
      <span className="conversationName">{conversation[0]?.user[0].name}</span>
    </div>
  );
}

export default SidebarHome;
