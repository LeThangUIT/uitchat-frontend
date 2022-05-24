import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle } from '@mui/material';

function UpdatePassword() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
    <Button onClick={() => {handleClickOpen()}} className="profile__button" variant="contained">
        Edit
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change your Password</DialogTitle>
      <DialogContent>
        <div>hello</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {/* <Button onClick={handleDelete}>Delete</Button> */}
      </DialogActions>
    </Dialog>
  </div>
  )
}
export default UpdatePassword