export const END_POINT =
  process.env.REACT_APP_END_POINT || "http://localhost:8000";
export const API_URL = `${END_POINT}/api/v1`;
// export const API_URL = "https://uitchat.herokuapp.com/api/v1";
// export const END_POINT = "https://uitchat.herokuapp.com";
export const HTTP_STATUS = Object.freeze({
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
});
