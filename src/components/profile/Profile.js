import React, { useEffect, useLayoutEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, IconButton, Input } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { storage } from "../../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Profile.css";
import { logout } from "../../features/authSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    if(image!==null) {
      const imageRef = ref(storage, "image " + currentUser.user.email);
      uploadBytes(imageRef, image)
    }
  }, [image])
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
     setImage(e.target.files[0]);
    }
  };
  return (
    <div className="profile">
      <ArrowBackIosNewIcon onClick={() => navigate(-1)}className="profile__header profile__backIcon"/>
      <div className="profile__container">
        <header className="profile__header">
          <h2>My Account</h2>
        </header>
        <div className="profile__body">
          <div className="profile_editAvatar">
            <div className="profile__avatar">
              <Avatar
               src={currentUser.user.avatar}
                sx={{ width: "100px", height: "100px" }}
              />
            </div>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file"  onChange={handleImageChange}/>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <div className="profile__info">
            <div className="profile__edit">
              <div className="profile__infoItem">
                <strong>Name</strong>
                <p>{currentUser.user.name}</p>
              </div>
              <Button className="profile__button" variant="contained">
                Edit
              </Button>
            </div>
            <div className="profile__edit">
              <div className="profile__infoItem">
                <strong>Email</strong>
                <p>{currentUser.user.email}</p>
              </div>
              <Button className="profile__button" variant="contained">
                Edit
              </Button>
            </div>
            <div className="profile__edit">
              <Button className="profile__button" variant="contained">
                Change password
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={() => {dispatch(logout())}} className="profile__button" sx={{ mt: 8 }} color="error" variant="contained">
        Logout
      </Button>
    </div>
  );
};
export default Profile;