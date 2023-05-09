import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExpenseList = createAsyncThunk(
  "users/fetchList",
  async () => {
    let dataUrl = "http://localhost:9000/expenses";
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchExpenseById = createAsyncThunk(
  "users/fetchExpenseById",
  async (expenseId) => {
    let dataUrl = `http://localhost:9000/expenses/${expenseId}`;
    const response = await axios.get(dataUrl);
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchExpenseByName = createAsyncThunk(
  "users/fetchExpenseByName",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/expenses/search";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const fetchExpenseByDate = createAsyncThunk(
  "users/fetchExpenseByDate",
  async (data, thunkAPI) => {
    console.log("in search api", data);
    const url = "http://localhost:9000/expenses/filter";
    const response = await axios.get(url, {
      params: data,
    });
    console.log("in api call", response);
    return response.data;
  }
);

export const postExpense = createAsyncThunk(
  "users/postExpense",
  async (data, thunkAPI) => {
    console.log("in post api", data);
    const config = {
      method: "post",
      url: "http://localhost:9000/expenses",
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

export const editExpense = createAsyncThunk(
  "users/editExpense",
  async (data, thunkAPI) => {
    console.log("in edit api", data);
    const config = {
      method: "put",
      url: `http://localhost:9000/expenses/${data.id}`,
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

export const deleteExpense = createAsyncThunk(
  "users/deleteExpense",
  async (id, thunkAPI) => {
    console.log("in del api", id);
    const config = {
      method: "delete",
      url: `http://localhost:9000/expenses/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("in api call", response);
    return response.data;
  }
);
