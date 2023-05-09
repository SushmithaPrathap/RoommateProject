import * as userService from "../services/user-service.js";

const setSuccessRes = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const setErrorRes = (error, response) => {
  response.status(500);
  response.json(error);
};

/**
 * @desc created a new chorechart item by calling the save service and calls the setSuccess func on success and calls the setError func on failure
 */
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const chorechart = await userService.save(payload);
    setSuccessRes(chorechart, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc gets the whole item list
 */
export const getList = async (request, response) => {
  console.log("in get controller");
  try {
    const userList = await userService.getList();
    setSuccessRes(userList, response);
  } catch (err) {
    setErrorRes(err, response);
  }
};

export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const todoItem = await userService.remove(id);
    setSuccessRes({ message: `Successfully removed ${id}` }, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};
