import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

import "./ContactList.css";

export default function ContactList({ contact, isActive }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const userInfo = contact.users.find((user) => user._id !== currentUser.id);
  return (
    <div className={isActive ? "contact__container active" : "contact__container"}>
      <Avatar src={userInfo.avatar} alt={userInfo.name} />
      <div className="contact__info">
        <h3>{userInfo.name}</h3>
        <p>{userInfo.email}</p>
      </div>
    </div>
  );
}
