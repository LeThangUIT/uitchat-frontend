import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import UpdateServer from "../sidebar/UpdateServer";
import InviteUser from "../sidebar/InviteUser";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { selectInfoServer } from "../../features/infoServerSlice";
import { fetchDeleteServer } from "../../features/serverSlice";
import DeleteMember from "../sidebar/DeleteMember";
import { socketEmitEvent } from "../../features/socketSlice";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function EditServer() {
  const infoServer = useSelector(selectInfoServer);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  var isOwner = false;

  if ("ownerIds" in infoServer) {
    infoServer.ownerIds.forEach((owner) => {
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
  const handleDeleteServer = () => {
    if (window.confirm("Are you sure you want to delete this server?")) 
    { 
      navigate("/servers/@me");
      // dispatch(fetchDeleteServer(infoServer._id));
      const deleteServer = {
        name: "delete-server",
        data: {
          serverId: infoServer._id,
        },
      };
      dispatch(socketEmitEvent(deleteServer));
    } 
    handleClose();    
  };
  const handleLeaveServer = () => {
    if (window.confirm("Are you sure you want to leave this server?")) 
    { 
      navigate("/servers/@me");
      const leaveServer = {
        name: "leave-server",
        data: {
          serverId: infoServer._id,
        },
      };
      dispatch(socketEmitEvent(leaveServer));
    } 
    handleClose();    
  };
  return (
    <div>
      <KeyboardArrowDownIcon
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
      />

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <InviteUser />
        <Divider sx={{ my: 0.5 }} />
        {isOwner ? (
          <div>
            <DeleteMember/>
            <UpdateServer onClick={handleClose}/>
            <MenuItem
              onClick={() => {
                handleDeleteServer();
              }}
              disableRipple
            >
              <DeleteIcon />
              Delete Server
            </MenuItem>
          </div>
        ) : (
          <MenuItem  onClick={() => {
            handleLeaveServer();
            }} disableRipple>
              <LogoutIcon />
            Leave Server
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
