import { createSlice } from "@reduxjs/toolkit";
import { fetchUserList } from "../../utils/user-api";

//Set the initial state for expense store
//Expense list contains list of Expense expense. Loading and error are used as flags
const initialState = {
  loading: false,
  userList: [],
  error: null,
};

//Create reducers for expense.
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state, action) => {
        state.loading = true;
      })
      //Get Expense list from the database and set it to the Expenselist state
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default UserSlice.reducer;
