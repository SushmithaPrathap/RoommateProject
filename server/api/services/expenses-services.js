import Expense from "../models/expense.js";
/**
 * @desc created a new expense item
 */
export const save = (newExpense) => {
  //mongoose docs - model.prototype.save()
  const expense = new Expense(newExpense);
  return expense.save();
};

/**
 * @desc gets the expenses based on the query params passed
 */
export const search = async (query) => {
  const params = { ...query };
  const expenseResult = Expense.find(params).exec(); //find does an database query, returns the result as promise
  return expenseResult;
};

export const searchDate = async (query) => {
  const params = { ...query };
  const expenseResult = Expense.find(params).exec(); //find does an database query, returns the result as promise
  return expenseResult;
};

/**
 * @desc gets the specific expense item
 */
export const get = (id) => {
  const expenseItem = Expense.findById(id).exec();
  return expenseItem;
};

/**
 * @desc gets the expense list
 */
export const getList = async () => {
  let fullList = await Expense.find();
  return fullList;
};

/**
 * @desc update the spefic Expense item
 */
export const update = (updateExpense) => {
  updateExpense.lastModifiedDate = new Date();
  const expenseUpdated = Expense.findByIdAndUpdate(
    updateExpense.id,
    updateExpense,
    {
      new: true,
    }
  ).exec();
  return expenseUpdated;
};

/**
 * @desc deletes the speecific expense item
 */
export const remove = (id) => {
  const expenseDeleted = Expense.findByIdAndDelete(id).exec();
  return expenseDeleted;
};
