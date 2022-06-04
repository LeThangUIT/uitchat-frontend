import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { socketEmitEvent } from "../../features/socketSlice";

import "./ChannelList.css";
import { selectInfoServer } from "../../features/infoServerSlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function ChannelList({ channel }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  const server = useSelector(selectInfoServer);
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = React.useState(false);
  const open = Boolean(anchorEl);
  var isOwner = false;
  const [name, setName] = React.useState(channel.name)

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
    setOpenEdit(true)
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  }; 

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

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

  const handleSave = () => {
    handleCloseEdit()
    const event = {
      name: "changeName-channel",
      data: {
        channelId: channel._id,
        channelName: name,
        serverId: channel.serverId
      },
    };
    dispatch(socketEmitEvent(event));
  }
  return (
    <div className="channelList">
      <h5>
        {channel.type ===  "text" ? (<span className="channelList__hash">#</span>) : (<VolumeUpIcon className="channelList__hash"/>)}
        
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

          <Dialog open={openEdit} onClose={handleCloseEdit}>
            <DialogTitle>Change channel's name</DialogTitle>
            <DialogContent>
              <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  value= {name}
                  onChange={onChangeName}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default ChannelList;
