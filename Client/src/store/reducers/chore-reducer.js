import { createSlice } from "@reduxjs/toolkit";
import {
  deleteChore,
  editChore,
  fetchChoreByDate,
  fetchChoreByName,
  fetchChoreList,
  postChore,
} from "../../Utils/chore-api";

//Set the initial state for chore store
//Chore list contains the list of chores. Loading and error are used as flags
const initialState = {
  loading: false,
  choreList: [],
  error: null,
};

//Create reducers for chore.
const ChoreSlice = createSlice({
  name: "chore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChoreList.pending, (state, action) => {
        state.loading = true;
      })
      //Get Chore list from the database and set it to the Chorelist state
      .addCase(fetchChoreList.fulfilled, (state, action) => {
        state.loading = false;
        state.choreList = action.payload;
      })
      .addCase(fetchChoreList.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(postChore.pending, (state, action) => {
        state.loading = true;
      })
      //Add new Chore to the database and update the state
      .addCase(postChore.fulfilled, (state, action) => {
        state.loading = false;
        state.choreList.push(action.payload);
      })
      .addCase(postChore.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(editChore.pending, (state, action) => {
        state.loading = true;
      })
      //Edit Chore and reflect the change in the db
      .addCase(editChore.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.choreList.findIndex(
          (chore) => chore.id === action.payload.id
        );
        state.choreList[index] = {
          ...state[index],
          ...action.payload,
        };
        console.log("state after edit", state.choreList[index]);
      })
      .addCase(editChore.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(deleteChore.pending, (state, action) => {
        state.loading = true;
      })
      //Delete Chore and update the state
      .addCase(deleteChore.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.choreList.findIndex(
          ({ id }) => id === action.payload.id
        );
        console.log("index in del", index);
        state.choreList.splice(index, 1);
        console.log("state after del", state);
      })
      .addCase(deleteChore.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })

      .addCase(fetchChoreByName.pending, (state, action) => {
        state.loading = true;
      })
      //Get chore up search query
      .addCase(fetchChoreByName.fulfilled, (state, action) => {
        state.loading = false;
        state.choreList = action.payload;
        console.log("state after search", state.choreList);
      })
      .addCase(fetchChoreByName.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(fetchChoreByDate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchChoreByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.choreList = action.payload;
        console.log("state after search", state.choreList);
      })
      .addCase(fetchChoreByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default ChoreSlice.reducer;
