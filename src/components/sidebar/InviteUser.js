import { useState } from "react";
import { API_URL } from "../../app/constant";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { fetchAddMember } from "../../features/memberSlice";
import { socketEmitEvent } from "../../features/socketSlice";
import { useParams } from "react-router-dom";
import { selectInfoServer } from "../../features/infoServerSlice";

export default function InviteUser() {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const { serverId } = useParams();
  const server = useSelector(selectInfoServer);
  let receiverIds = selectedOptions.map((receiver) => receiver._id);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    axios.get(`${API_URL}/users`, { headers: authHeader() }).then((res) => {
      const userList = res.data.filter(
        (user) =>
          server.ownerIds.findIndex((owner) => owner._id === user._id) &&
          server.memberIds.findIndex((member) => member._id === user._id)
      );
      setUsers(userList);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = () => {
    handleClose();
    // dispatch(
    //   fetchAddMember({
    //     server_id: infoServer._id,
    //     owner_ids: [],
    //     member_ids: member_ids,
    //   })
    // );
    const inviteUsersEvent = {
      name: "invite-users",
      data: {
        serverId,
        receiverIds,
      },
    };
    dispatch(socketEmitEvent(inviteUsersEvent));
  };

  const handleChange = (event, value) => {
    console.log(users)
    setSelectedOptions(value);
  };

  return (
    <div>
      <MenuItem
        onClick={() => {
          handleClickOpen();
        }}
        disableRipple
      >
        <GroupAddIcon />
        Invite People
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite people</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
              onChange={handleChange}
              multiple
              id="tags-outlined"
              options={users}
              getOptionLabel={(option) => option.email}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="selected user"
                  placeholder="Typing email"
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleInvite}>Invite</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
