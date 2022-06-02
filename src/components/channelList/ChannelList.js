import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { socketEmitEvent } from "../../features/socketSlice";

import "./ChannelList.css";
import { selectInfoServer } from "../../features/infoServerSlice";

function ChannelList({ channel }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  const server = useSelector(selectInfoServer);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  var isOwner = false;

  if ("ownerIds" in server) {
    server.ownerIds.forEach((owner) => {
      if (owner.email === currentUser.email) {
        isOwner = true;
      }
    });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure to delete this channel?")) {
      const deleteChannel = {
        name: "delete-channel",
        data: {
          channelId: channel._id,
        },
      };
      dispatch(socketEmitEvent(deleteChannel));
    }
    handleClose();
  };

  return (
    <div className="channelList">
      <h5>
        <span className="channelList__hash">#</span>
        {channel.name}
      </h5>
      {channel.name !== "General" && isOwner && (
        <>
          <IconButton
            aria-label="more"
            id="edit-channel-btn"
            aria-controls={open ? "edit-channel" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            id="edit-channel"
            aria-labelledby="edit-channel-btn"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ jutifyContent: "flex-end" }}
          >
            <MenuItem onClick={handleEdit}>edit</MenuItem>
            <MenuItem onClick={handleDelete}>delete</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}

export default ChannelList;
