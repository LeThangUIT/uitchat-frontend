// export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.access_token) {
//       return { Authorization: 'Bearer ' + user.access_token };
//     } else {
//       return {};
//     }
// }

export default function authHeader() {
  const user = localStorage.getItem('user');
  const token = JSON.parse(localStorage.getItem('token'));
  if (token && user) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
