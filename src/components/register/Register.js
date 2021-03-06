import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Navigate, Link } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Yup from "yup";
import { register } from "../../features/authSlice";
import { clearMessage } from "../../features/messageSlice";
import "./Register.css";
import { Button } from "@mui/material";
const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  });
  const [image, setImage] = React.useState(null);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleRegister = (formValue) => {
    if (image !== null) {
      const imageRef = ref(storage, "image " + formValue.email);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then(async (url) => {
          formValue.avatar = url;
          const { email, password, name, avatar } = formValue;
          dispatch(register({ email, password, name, avatar }))
            .unwrap()
            .then(() => {
              setSuccessful(true);
            })
            .catch(() => {
              setSuccessful(false);
            });
        });
      });
    } else {
      formValue.avatar = null;
      const { email, password, name, avatar } = formValue;
      dispatch(register({ email, password, name, avatar }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/servers/@me" />;
  }
  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <div className="hi create_account">Create an account</div>
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="alert alert-warning"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Username</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="avatar">Avatar</label>
                  <Field
                    name="avatar"
                    type="file"
                    onChange={handleImageChange}
                    className="button_image"
                  />
                  <ErrorMessage
                    name="avatar"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <Button type="submit" className="btn_login">
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
            <Link to={"/login"} className="nav-link">
              Already have an account?
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default Register;
