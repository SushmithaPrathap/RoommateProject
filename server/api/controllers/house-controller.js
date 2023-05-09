import * as houseService from '../services/house-services.js'


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
      const chorechart = await houseService.save(payload);
      setSuccessRes(chorechart, response);
    } catch (error) {
      setErrorRes(error, response);
    }
  };
  
  /**
   * @desc searches the chorechart item based on the query parameter by calling the index service and calls the setSuccess func on success and calls the setError func on failure
   */
  export const index = async (request, response) => {
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
      const chorechartItem = await houseService.search(query);
      setSuccessRes(chorechartItem, response);
    } catch (error) {
      setErrorRes(error, response);
    }
  };
  
  /**
   * @desc gets the specific chorechart item based on the id by calling the get service and calls the setSuccess func on success and calls the setError func on failure
   */
  export const get = async (request, response) => {
    try {
      const id = request.params.id;
      const chorechartItem = await houseService.get(id);
      setSuccessRes(chorechartItem, response);
    } catch (error) {
      setErrorRes(error, response);
    }
  };
  
  /**
   * @desc upadates the spcific chorechart item based on the id parameter by calling the update service and calls the setSuccess func on success and calls the setError func on failure
   */
  export const update = async (request, response) => {
    try {
      const id = request.params.id;
      const updateItem = { ...request.body };
      updateItem.id = id;
      // console.log("update", updateItem);
      const chorechartItem = await houseService.update(updateItem);
      setSuccessRes(chorechartItem, response);
    } catch (error) {
      setErrorRes(error, response);
    }
  };
  
  /**
   * @desc deletes the chorechart item based on the id parameter by calling the remove service and calls the setSuccess func on success and calls the setError func on failure
   */
  export const remove = async (request, response) => {
    try {
      const id = request.params.id;
      const chorechartItem = await houseService.remove(id);
      setSuccessRes({ message: `Successfully removed ${id}` }, response);
    } catch (error) {
      setErrorRes(error, response);
    }
  };
  