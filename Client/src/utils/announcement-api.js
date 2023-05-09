import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnnouncementList = createAsyncThunk(
  "users/fetchList",
  async () => {
    let dataUrl = "http://localhost:9000/announcements";
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchAnnouncementById = createAsyncThunk(
  "users/fetchAnnouncementById",
  async (announcementId) => {
    let dataUrl = `http://localhost:9000/announcements/${announcementId}`;
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchAnnouncementByName = createAsyncThunk(
  "users/fetchAnnouncementByName",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/announcements/search";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchAnnouncementByDate = createAsyncThunk(
  "users/fetchAnnouncementByDate",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/announcements/filter";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const postAnnouncement = createAsyncThunk(
  "users/postAnnouncement",
  async (data, thunkAPI) => {
    console.log("in post api", data);
    const config = {
      method: "post",
      url: "http://localhost:9000/announcements",
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

export const editAnnouncement= createAsyncThunk(
  "users/editAnnouncement",
  async (data, thunkAPI) => {
    console.log("in edit api", data);
    const config = {
      method: "put",
      url: `http://localhost:9000/announcements/${data.id}`,
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

export const deleteAnnouncement = createAsyncThunk(
  "users/deleteAnnouncement",
  async (id, thunkAPI) => {
    console.log("in del api", id);
    const config = {
      method: "delete",
      url: `http://localhost:9000/announcements/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);
