import { configureStore, combineReducers } from "@reduxjs/toolkit";
import expenseReducer from "./expense-reducer.js";
import choreReducer from "./chore-reducer.js";
import shoppinglistReducer from "./shoppinglist-reducer.js";
import userReducer from "./user-reducer.js";
import allUsersReducer from "./all-users-reducer.js";
import announcementReducer from "./announcement-reducer.js";
import todoReducer from "./todo-reducer.js";

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    chore: choreReducer,
    shoppinglist: shoppinglistReducer,
    user: userReducer,
    users: allUsersReducer,
    announcements: announcementReducer,
    todo: todoReducer,
  },
});

export default store;
