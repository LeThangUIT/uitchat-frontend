import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { API_URL } from "../../app/constant";
import authHeader from "../../services/auth-header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactData, selectContact } from "../../features/contactSlice";
import { socketEmitEvent } from "../../features/socketSlice";

import "./SearchContact.css";

export default function SearchContact() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const contacts = useSelector(selectContact);

  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    dispatch(fetchContactData()).then((response) => {
      const contactList = response.payload;
      const userContactList = contactList.map((contact) =>
        contact.users.find((user) => user._id !== currentUser.id)
      );
      axios.get(`${API_URL}/users`, { headers: authHeader() }).then((res) => {
        const userList = res.data.filter(
          (user) =>
            !(
              user._id === currentUser.id ||
              (userContactList.length &&
                userContactList.find(
                  (userContact) => userContact._id === user._id
                ))
            )
        );
        setUsers(userList);
      });
    });
  }, []);

  const handleChange = (event, value) => {
    if (value) {
      const createContact = {
        name: "create-contact",
        data: {
          receiverId: value._id,
        },
      };
      dispatch(socketEmitEvent(createContact));
      setSelectedOption(value);
    }
  };

  return (
    <>
      <Autocomplete
        onChange={handleChange}
        className="search-box"
        disablePortal
        id="combo-box-demo"
        options={users}
        getOptionLabel={(option) => option.email || ""}
        sx={{ width: 300 }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option._id}>
              {option.email}
            </li>
          );
        }}
        renderInput={(params) => {
          return <TextField {...params} label="Search" />;
        }}
      />
    </>
  );
}
