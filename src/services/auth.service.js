import axios from "axios";
import { API_URL } from "../app/constant";
import authHeader from "./auth-header";
const register = ( email, password, name, avatar) => {
  return axios
    .post(API_URL + "/auth/register", {
      email,
      password,
      name,
      avatar,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.access_token));
      }
      return response.data;
    });
};
const update = ( data) => {
  return axios
  .patch(API_URL + "/users/me", data, {
    headers: authHeader(),
  })
  .then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  });
}
const login = (email, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.access_token));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

};
const authService = {
  register,
  login,
  logout,
  update,
};
export default authService;
