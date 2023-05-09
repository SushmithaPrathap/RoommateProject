import { createSlice } from "@reduxjs/toolkit";
import {
  deleteExpense,
  editExpense,
  fetchExpenseByDate,
  fetchExpenseByName,
  fetchExpenseList,
  postExpense,
} from "../../Utils/expense-api";

//Set the initial state for expense store
//Expense list contains list of Expense expense. Loading and error are used as flags
const initialState = {
  loading: false,
  expenseList: [],
  error: null,
};

//Create reducers for expense.
const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseList.pending, (state, action) => {
        state.loading = true;
      })
      //Get Expense list from the database and set it to the Expenselist state
      .addCase(fetchExpenseList.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseList = action.payload;
      })
      .addCase(fetchExpenseList.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(postExpense.pending, (state, action) => {
        state.loading = true;
      })
      //Add new Expense to the database and update the state
      .addCase(postExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseList.push(action.payload);
      })
      .addCase(postExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(editExpense.pending, (state, action) => {
        state.loading = true;
      })
      //Edit Expense and reflect the change in the db
      .addCase(editExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expenseList.findIndex(
          (expense) => expense.id === action.payload.id
        );
        state.expenseList[index] = {
          ...state[index],
          ...action.payload,
        };
        console.log("state after edit", state.expenseList[index]);
      })
      .addCase(editExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.loading = true;
      })
      //Delete Expense and update the state
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.expenseList.findIndex(
          ({ id }) => id === action.payload.id
        );
        console.log("index in del", index);
        state.expenseList.splice(index, 1);
        console.log("state after del", state);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })

      .addCase(fetchExpenseByName.pending, (state, action) => {
        state.loading = true;
      })
      //Get expense up search query
      .addCase(fetchExpenseByName.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseList = action.payload;
        console.log("state after search", state.expenseList);
      })
      .addCase(fetchExpenseByName.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      })
      .addCase(fetchExpenseByDate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExpenseByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseList = action.payload;
        console.log("state after search", state.expenseList);
      })
      .addCase(fetchExpenseByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = "Oops, something went wrong!";
      });
  },
});

export default ExpenseSlice.reducer;
