import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Add from "@mui/icons-material/Add";
import { fetchAddNewChannel } from "../../features/channelSlice";
import { useDispatch } from "react-redux";
import { socketEmitEvent } from "../../features/socketSlice";

export default function AddChannel({ serverId, type }) {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleCreate = () => {
    handleClose();
    setName("");
    // dispatch(fetchAddNewChannel({ serverId, name }));
    const addChannel = {
      name: "add-channel",
      data: {
        serverId: serverId,
        name: name,
        type
      },
    };
    dispatch(socketEmitEvent(addChannel));
  };

  return (
    <div>
      <Add onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new channel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="CHANNEL NAME"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
