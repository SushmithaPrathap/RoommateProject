import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:9000";

export const fetchUserList = createAsyncThunk(
  "users/fetchUserList",
  async () => {
    let authToken = JSON.parse(localStorage.getItem("authentication"));
    console.log("in user api", authToken);
    let config = {
      method: "get",
      url: BASE_URL + "/api/v1/users/me",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken.token,
      },
    };
    const response = await axios(config);
    console.log("response in fetch", response);
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  let config = {
    method: "get",
    url: BASE_URL + "/api/v1/users/getUsers",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios(config);
  console.log("response", response);
  return response.data;
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    console.log("in del api", id);
    const config = {
      method: "delete",
      url: `${BASE_URL}/api/v1/getUsers/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);
