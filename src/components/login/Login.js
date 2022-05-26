import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../features/authSlice";
import { clearMessage } from "../../features/messageSlice";
import "./Login.css";
const Login = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });
  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/servers/@me" />;
  }
  return (
    <div className="login-form">
      <div className="card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <div className="hi">Welcome back!</div>
              <div className="slogan">We're so happy to see you again! </div>
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
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group-login">
              <button type="submit" className="btn_login" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            <span className="ask_account">Need an account?</span>
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </Form>
        </Formik>
      </div>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
