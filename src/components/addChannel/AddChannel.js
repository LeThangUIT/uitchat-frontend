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
export default function AddChannel({ serverId }) {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(true);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    handleClose();
    dispatch(fetchAddNewChannel({ serverId, name, isPublic }));
  };

  const handleCheckPublic = (event) => {
    setIsPublic(event.target.checked);
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
          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                onChange={(e) => handleCheckPublic(e)}
              />
            }
            label="Public"
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
