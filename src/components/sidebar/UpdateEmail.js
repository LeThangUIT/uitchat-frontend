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

function UpdateEmail() {
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
  const { user: currentUser } = useSelector((state) => state.auth);
  const initialValues = {
    email: currentUser.email,
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });
  const handleDone = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(fetchUpdateUser({ email: email, current_password: password }))
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
      <Button
        onClick={() => {
          handleClickOpen();
        }}
        className="profile__button"
        variant="contained"
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{backgroundColor: '#44484b'}}>
          <span style={{color: 'white'}}>Change your email</span>
        </DialogTitle>
        <DialogContent sx={{backgroundColor: '#44484b'}}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleDone}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="email">email</label>
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
                  Save
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default UpdateEmail;
