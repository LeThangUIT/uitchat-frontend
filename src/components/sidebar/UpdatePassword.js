import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../../features/messageSlice";
import { fetchUpdateUser } from "../../features/authSlice";

function UpdatePassword() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = React.useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
    password: ""
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
    newPassword: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
    confirmPassword: Yup.string().when("newPassword", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Both password need to be the same"
      )
    })
  });
  const handleDone = (formValue) => {
    const { newPassword, password } = formValue;
    console.log(formValue)
    setLoading(true);
    dispatch(fetchUpdateUser({ password: newPassword, current_password: password }))
      .unwrap()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Button className="profile__button" onClick={() => {
          handleClickOpen();
        }} variant="contained">
                Change password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change your password</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleDone}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="newPassword">New password</label>
                <Field name="newPassword" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field name="confirmPassword" type="password" className="form-control" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="alert alert-warning"
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
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Done
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default UpdatePassword