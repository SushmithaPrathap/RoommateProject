import { createSlice } from "@reduxjs/toolkit";
import {
  deleteShoppinglist,
  editShoppinglist,
  fetchShoppinglistByDate,
  fetchShoppinglistByName,
  fetchShoppinglist,
  postShoppinglist,
} from "../../Utils/shoppinglist-api";

//Set the initial state for shoppinglist store
//Shopping list contains the list of shoppinglists. Loading and error are used as flags
const initialState = {
  loading: false,
  shoppingList: [],
  error: null,
};

//Create reducers for shoppinglist.
const ShoppinglistSlice = createSlice({
  name: "shoppinglist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppinglist.pending, (state, action) => {
        state.loading = true;
      })
      //Get Shopping list from the database and set it to the Shoppinglist state
      .addCase(fetchShoppinglist.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingList = action.payload;
      })
      .addCase(fetchShoppinglist.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(postShoppinglist.pending, (state, action) => {
        state.loading = true;
      })
      //Add new Shoppinglist to the database and update the state
      .addCase(postShoppinglist.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingList.push(action.payload);
      })
      .addCase(postShoppinglist.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(editShoppinglist.pending, (state, action) => {
        state.loading = true;
      })
      //Edit Shoppinglist and reflect the change in the db
      .addCase(editShoppinglist.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shoppingList.findIndex(
          (shoppinglist) => shoppinglist.id === action.payload.id
        );
        state.shoppingList[index] = {
          ...state[index],
          ...action.payload,
        };
        console.log("state after edit", state.shoppingList[index]);
      })
      .addCase(editShoppinglist.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(deleteShoppinglist.pending, (state, action) => {
        state.loading = true;
      })
      //Delete Shoppinglist and update the state
      .addCase(deleteShoppinglist.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.shoppingList.findIndex(
          ({ id }) => id === action.payload.id
        );
        console.log("index in del", index);
        state.shoppingList.splice(index, 1);
        console.log("state after del", state);
      })
      .addCase(deleteShoppinglist.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })

      .addCase(fetchShoppinglistByName.pending, (state, action) => {
        state.loading = true;
      })
      //Get shopping list up search query
      .addCase(fetchShoppinglistByName.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingList = action.payload;
        console.log("state after search", state.shoppingList);
      })
      .addCase(fetchShoppinglistByName.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(fetchShoppinglistByDate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchShoppinglistByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingList = action.payload;
        console.log("state after search", state.shoppingList);
      })
      .addCase(fetchShoppinglistByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default ShoppinglistSlice.reducer;
