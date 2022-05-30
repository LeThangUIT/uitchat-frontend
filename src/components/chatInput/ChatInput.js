import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifBoxIcon from "@mui/icons-material/GifBox";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Menu from "@mui/material/Menu";
import Picker from "emoji-picker-react";
import { addInputMessage } from "../../features/conversationSlice";

import "./ChatInput.css";
import { useParams } from "react-router-dom";
import { selectInfoContact } from "../../features/infoContactSlice";
import { selectInfoChannel } from "../../features/infoChannelSlice";

export default function ChatInput({
  currentUserId,
  message,
  setMessage,
  sendMessage,
}) {
  const channel = useSelector(selectInfoChannel);
  const contact = useSelector(selectInfoContact);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [username, setUsername] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMessage(message + emojiObject.emoji);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="chat__input">
      <AddCircleIcon fontSize="large" />
      <div className="form">
        <input
          type="text"
          placeholder={
            serverId
              ? `Message #${channel.name}`
              : `Message @${
                  Object.keys(contact).length &&
                  contact.users.find((user) => user._id !== currentUserId).name
                }`
          }
          value={message}
          onChange={(e) => {
            let val = e.target.value;
            dispatch(addInputMessage({ channelId, message: val }));
            setMessage(val);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
      <div className="chat__inputIcons">
        <div className="icon_item">
          <IconButton>
            <CardGiftcardIcon />
          </IconButton>
        </div>
        <div className="icon_item">
          <IconButton>
            <GifBoxIcon />
          </IconButton>
        </div>
        <div className="icon_item">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <EmojiEmotionsIcon style={{ color: "white" }} />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <Picker onEmojiClick={onEmojiClick} />
          </Menu>
        </div>
      </div>
    </div>
  );
}
