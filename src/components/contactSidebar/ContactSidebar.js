import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  addNewContactFromSocket,
  selectContact,
} from "../../features/contactSlice";
import { selectSocket, socketAddListener } from "../../features/socketSlice";
import ContactInfo from "../contactInfo/ContactInfo";
import SearchContact from "../searchContact/SearchContact";

export default function ContactSidebar() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);
  const socket = useSelector(selectSocket);

  useEffect(() => {
    if (socket) {
      const createdContactEvent = {
        name: "created-contact",
        callback: (contact) => {
          dispatch(addNewContactFromSocket(contact));
        },
      };
      dispatch(socketAddListener(createdContactEvent));
    }
  }, [socket]);

  return (
    <>
      <div className="sidebar__top">
        <SearchContact />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header" style={{ marginLeft: "10px" }}>
            <h3>Contacts</h3>
          </div>
        </div>

        <div className="sidebar__channelsList">
          {contacts.map((contact) => (
            <NavLink
              key={contact._id}
              to={contact._id}
              style={({ isActive }) => {
                return {
                  textDecoration: "none",
                  color: isActive ? "white" : "gray",
                };
              }}
            >
              {({ isActive }) => (
                <ContactInfo isActive={isActive} contact={contact} />
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
