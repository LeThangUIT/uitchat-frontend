import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteMember, fetchMemberData, selectMember } from '../../features/memberSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from "@mui/material/MenuItem";
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { selectInfoServer } from '../../features/infoServerSlice';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

function DeleteMember() {
  const members = useSelector(selectMember)
  console.log(members)
  const [memberIds, setMemberIds] = React.useState([])
  const infoServer = useSelector(selectInfoServer);
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchMemberData(infoServer._id))
  }, [])
  
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    let data = memberIds;
    data.push(e.target.value)
    setMemberIds(data)
    console.log(memberIds)
  }
  const handleDelete = () => {
    dispatch(fetchDeleteMember({server_id: infoServer._id, user_list: memberIds}))
  }
  return (
    <div>
    <MenuItem onClick={() => {handleClickOpen()}} disableRipple>
        <GroupRemoveIcon />
        Delete People
    </MenuItem>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Select people to delete</FormLabel>
        {members.map((member) => {
          return (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) =>handleChange(e)}  value= {member._id} />
                }
                label= {member.email}
              />
            </FormGroup>
          )
        })}
      </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default DeleteMember