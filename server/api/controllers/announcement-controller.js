import * as announcementService from "../services/announcement-services.js";

const setSuccessRes = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const setErrorRes = (error, response) => {
  response.status(500);
  response.json(error);
};

/**
 * @desc created a new announcement item by calling the save service and calls the setSuccess func on success and calls the setError func on failure
 */
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const announcement = await announcementService.save(payload);
    setSuccessRes(announcement, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc searches the announcement item based on the query parameter by calling the index service and calls the setSuccess func on success and calls the setError func on failure
 */
export const index = async (request, response) => {
  console.log("in controller", request.query);
  try {
    const title = request.query.title;
    const des = request.query.description;
    const query = {};
    if (title) {
      query.title = title;
    }
    if (des) {
      query.desscription = des;
    }
    // console.log("query", query, "req", request.query);
    const announcementItem = await announcementService.search(query);
    setSuccessRes(announcementItem, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

export const getList = async (request, response) => {
  try {
    const itemList = await announcementService.getList();
    setSuccessRes(itemList, response);
  } catch (err) {
    setErrorRes(err, response);
  }
};

/**
 * @desc gets the specific announcement item based on the id by calling the get service and calls the setSuccess func on success and calls the setError func on failure
 */
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const announcementItem = await announcementService.get(id);
    setSuccessRes(announcementItem, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc upadates the spcific announcement item based on the id parameter by calling the update service and calls the setSuccess func on success and calls the setError func on failure
 */
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updateItem = { ...request.body };
    updateItem.id = id;
    // console.log("update", updateItem);
    const announcementItem = await announcementService.update(updateItem);
    setSuccessRes(announcementItem, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};

/**
 * @desc deletes the announcement item based on the id parameter by calling the remove service and calls the setSuccess func on success and calls the setError func on failure
 */
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const announcementItem = await announcementService.remove(id);
    setSuccessRes({ message: `Successfully removed ${id}` }, response);
  } catch (error) {
    setErrorRes(error, response);
  }
};
