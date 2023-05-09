import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTodo,
  editTodo,
  fetchTodoByDate,
  fetchTodoByName,
  fetchTodoList,
  postTodo,
} from "../../Utils/todo-api";

//Set the initial state for todo store
//Todo list contains the list of todos. Loading and error are used as flags
const initialState = {
  loading: false,
  todoList: [],
  error: null,
};

//Create reducers for todo.
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.loading = true;
      })
      //Get Todo list from the database and set it to the Todolist state
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.loading = false;
        state.todoList = action.payload;
      })
      .addCase(fetchTodoList.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(postTodo.pending, (state, action) => {
        state.loading = true;
      })
      //Add new Todo to the database and update the state
      .addCase(postTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todoList.push(action.payload);
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(editTodo.pending, (state, action) => {
        state.loading = true;
      })
      //Edit Todo and reflect the change in the db
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todoList.findIndex(
          (todo) => todo.id === action.payload.id
        );
        state.todoList[index] = {
          ...state[index],
          ...action.payload,
        };
        console.log("state after edit", state.todoList[index]);
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.loading = true;
      })
      //Delete Todo and update the state
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.todoList.findIndex(
          ({ id }) => id === action.payload.id
        );
        console.log("index in del", index);
        state.todoList.splice(index, 1);
        console.log("state after del", state);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })

      .addCase(fetchTodoByName.pending, (state, action) => {
        state.loading = true;
      })
      //Get todo up search query
      .addCase(fetchTodoByName.fulfilled, (state, action) => {
        state.loading = false;
        state.todoList = action.payload;
        console.log("state after search", state.todoList);
      })
      .addCase(fetchTodoByName.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(fetchTodoByDate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTodoByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.todoList = action.payload;
        console.log("state after search", state.todoList);
      })
      .addCase(fetchTodoByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default TodoSlice.reducer;
