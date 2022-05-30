import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./Conversation.css";

function SidebarHome() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <div className="conversation">
      <img className="conversationImg" src="" alt="" />
      <span className="conversationName">test</span>
    </div>
  );
}

export default SidebarHome;
