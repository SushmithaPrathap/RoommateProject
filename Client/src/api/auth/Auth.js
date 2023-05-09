import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:9000";

function login(username, password) {
  console.log(username);

  return axios
    .post(BASE_URL + "/api/v1/users/login", {
      username,
      password
    
    },{ withCredentials: true })
    .then((res) => {
      setAuth({ token: res.data.token });
      return res.data.token;
    });
}

function register(username, password,firstName, lastName) {
  return axios
    .post(BASE_URL + "/api/v1/users/signup", {
      username,
      password,
        firstName,
      lastName
    }, 
    {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      setAuth({ token: res.data.token });
      return res.data.token;
    });
}

function logout() {
  localStorage.removeItem("authentication");
  window.location.href = "/login";
}

function getAuth() {
  const auth = JSON.parse(localStorage.getItem("authentication"));
  if (auth) {
    setDefaults(auth.token);
    return auth;
  }
  return null;
}

function setAuth(obj = {}) {
  localStorage.setItem("authentication", JSON.stringify(obj));
  setDefaults(obj.token);
}

function isAuth() {
  const auth = JSON.parse(localStorage.getItem("authentication"));
  console.log(auth);

  if (auth != null) {
    return true;
  }
  return false;
}

function setDefaults(token) {
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export const apiAuth = {
  login,
  logout,
  register,
  getAuth,
  setAuth,
  isAuth,
};
