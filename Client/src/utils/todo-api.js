import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodoList = createAsyncThunk(
  "users/fetchList",
  async () => {
    let dataUrl = "http://localhost:9000/todos";
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchTodoById = createAsyncThunk(
  "users/fetchTodoById",
  async (todoId) => {
    let dataUrl = `http://localhost:9000/todos/${todoId}`;
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchTodoByName = createAsyncThunk(
  "users/fetchTodoByName",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/todos/search";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchTodoByDate = createAsyncThunk(
  "users/fetchTodoByDate",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/todos/filter";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const postTodo = createAsyncThunk(
  "users/postTodo",
  async (data, thunkAPI) => {
    console.log("in post api", data);
    const config = {
      method: "post",
      url: "http://localhost:9000/todos",
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

export const editTodo= createAsyncThunk(
  "users/editTodo",
  async (data, thunkAPI) => {
    console.log("in edit api", data);
    const config = {
      method: "put",
      url: `http://localhost:9000/todos/${data.id}`,
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

export const deleteTodo = createAsyncThunk(
  "users/deleteTodo",
  async (id, thunkAPI) => {
    console.log("in del api", id);
    const config = {
      method: "delete",
      url: `http://localhost:9000/todos/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);
