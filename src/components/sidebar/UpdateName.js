import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateUser } from '../../features/authSlice';

function UpdateName() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(currentUser.name)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const dispatch = useDispatch()
  const handleSave = () => {
    if(name !== "") {
      dispatch(fetchUpdateUser({ name: name}))
      setOpen(false)
    }
  }
  return (
    <div>
    <Button onClick={() => {handleClickOpen()}} className="profile__button" variant="contained">
        Edit
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change your Name</DialogTitle>
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
  </div>
  )
}
export default UpdateName