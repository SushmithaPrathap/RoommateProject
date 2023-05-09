import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChoreList = createAsyncThunk(
  "users/fetchList",
  async () => {
    let dataUrl = "http://localhost:9000/chores";
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchChoreById = createAsyncThunk(
  "users/fetchChoreById",
  async (choreId) => {
    let dataUrl = `http://localhost:9000/chores/${choreId}`;
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchChoreByName = createAsyncThunk(
  "users/fetchChoreByName",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/chores/search";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchChoreByDate = createAsyncThunk(
  "users/fetchChoreByDate",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/chores/filter";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const postChore = createAsyncThunk(
  "users/postChore",
  async (data, thunkAPI) => {
    console.log("in post api", data);
    const config = {
      method: "post",
      url: "http://localhost:9000/chores",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);

export const editChore= createAsyncThunk(
  "users/editChore",
  async (data, thunkAPI) => {
    console.log("in edit api", data);
    const config = {
      method: "put",
      url: `http://localhost:9000/chores/${data.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);

export const deleteChore = createAsyncThunk(
  "users/deleteChore",
  async (id, thunkAPI) => {
    console.log("in del api", id);
    const config = {
      method: "delete",
      url: `http://localhost:9000/chores/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);
