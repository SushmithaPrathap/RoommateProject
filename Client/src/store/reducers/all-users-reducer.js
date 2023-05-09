import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers } from "../../utils/user-api";

//Set the initial state for expense store
//Expense list contains list of Expense expense. Loading and error are used as flags
const initialState = {
  loading: false,
  users: [],
  error: null,
};

//Create reducers for expense.
const AllUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      //Get Expense list from the database and set it to the Expenselist state
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      //Delete Todo and update the state
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.users.findIndex(({ id }) => id === action.payload.id);
        console.log("index in del", index);
        state.users.splice(index, 1);
        console.log("state after del", state);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default AllUsersSlice.reducer;
