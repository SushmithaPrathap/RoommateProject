import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShoppinglist = createAsyncThunk(
  "users/fetchList",
  async () => {
    let dataUrl = "http://localhost:9000/shoppinglists";
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchShoppinglistById = createAsyncThunk(
  "users/fetchShoppinglistById",
  async (shoppinglistId) => {
    let dataUrl = `http://localhost:9000/shoppinglists/${shoppinglistId}`;
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchShoppinglistByName = createAsyncThunk(
  "users/fetchShoppinglistByName",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/shoppinglists/search";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchShoppinglistByDate = createAsyncThunk(
  "users/fetchShoppinglistByDate",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/shoppinglists/filter";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const postShoppinglist = createAsyncThunk(
  "users/postShoppinglist",
  async (data, thunkAPI) => {
    console.log("in post api", data);
    const config = {
      method: "post",
      url: "http://localhost:9000/shoppinglists",
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

export const editShoppinglist= createAsyncThunk(
  "users/editShoppinglist",
  async (data, thunkAPI) => {
    console.log("in edit api", data);
    const config = {
      method: "put",
      url: `http://localhost:9000/shoppinglists/${data.id}`,
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

export const deleteShoppinglist = createAsyncThunk(
  "users/deleteShoppinglist",
  async (id, thunkAPI) => {
    console.log("in del api", id);
    const config = {
      method: "delete",
      url: `http://localhost:9000/shoppinglists/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);
