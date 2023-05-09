import * as expenseService from "../services/expenses-services.js";

const setSuccessRes = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const setErrorRes = (error, response) => {
  response.status(500);
  response.json(error);
};

/**
 * @desc created a new expense item by calling the save service and calls the setSuccess func on success and calls the setError func on failure
 */
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const expense = await expenseService.save(payload);
    setSuccessRes(expense, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc searches the expense item based on the query parameter by calling the index service and calls the setSuccess func on success and calls the setError func on failure
 */
export const index = async (request, response) => {
  try {
    const query = request.query;
    console.log("query", query, "req", request.query, request.body, request.params);
    const expenseItem = await expenseService.search(query);
    setSuccessRes(expenseItem, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

export const findDate = async (request, response) => {
  try {
    const query = request.query;
    console.log("query", query, "req", request.query, request.body, request.params);
    const expenseItem = await expenseService.searchDate(query);
    setSuccessRes(expenseItem, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc gets the specific expense item based on the id by calling the get service and calls the setSuccess func on success and calls the setError func on failure
 */
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const expenseItem = await expenseService.get(id);
    setSuccessRes(expenseItem, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc gets the whole item list
 */
export const getList = async (request, response) => {
  try {
    const itemList = await expenseService.getList();
    setSuccessRes(itemList, response);
  } catch (err) {
    setErrorRes(err, response);
  }
};

/**
 * @desc upadates the spcific expense item based on the id parameter by calling the update service and calls the setSuccess func on success and calls the setError func on failure
 */
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updateItem = { ...request.body };
    updateItem.id = id;
    // console.log("update", updateItem);
    const expenseItem = await expenseService.update(updateItem);
    setSuccessRes(expenseItem, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc deletes the expense item based on the id parameter by calling the remove service and calls the setSuccess func on success and calls the setError func on failure
 */
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const expenseItem = await expenseService.remove(id);
    setSuccessRes({ message: `Successfully removed ${id}` }, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};
