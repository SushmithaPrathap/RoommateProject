import axios from "axios";
import { apiAuth } from "./Auth";

const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:9000";

async function getProfile() {
  // let token = JSON.parse(localStorage.getItem("authentication"));
  // let config = {
  //   headers: {
  //     Authorization: "Bearer " + apiAuth.getAuth(),
  //   },
  // };
  // return axios.get(BASE_URL + "/api/v1/users/me");
  let authToken = JSON.parse(localStorage.getItem("authentication"));
  console.log("in user api", authToken);
  let config = {
    method: "get",
    url: BASE_URL + "/api/v1/users/me",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + apiAuth.getAuth(),
      Authorization: "Bearer " + authToken.token,
    },
  };
  const response = await axios(config);
  console.log("response", repsonse);
  return response.data;
}

function getUser() {
  apiUsers.getProfile().then((res) => {
    return res.data;
  });
}

export const apiUsers = {
  getProfile,
  getUser,
};
