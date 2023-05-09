
import House from "../models/house.js";
/**
 * @desc created a new house item 
 */
export const save = (newHouse) => {
    //mongoose docs - model.prototype.save()
    const house = new House(newHouse);
    return house.save();
  };
  
  /**
   * @desc gets the houses based on the query params passed
   */
  export const search = async (query) => {
    const params = { ...query };
    const houseResult = House.find(params).exec(); //find does an database query, returns the result as promise
    return houseResult;
  };
  
  /**
   * @desc gets the specific house item 
   */
  export const get = (id) => {
    const houseItem = House.findById(id).exec();
    return houseItem;
  };
  
  /**
   * @desc update the spefic house item
   */
  export const update = (updateHouse) => {
    updateHouse.lastModifiedDate = new Date();
    const houseUpdated = House.findByIdAndUpdate(updateHouse.id, updateHouse, {
      new: true,
    }).exec();
    return houseUpdated;
  };
  
  /**
   * @desc deletes the speecific house item
   */
  export const remove = (id) => {
    const houseDeleted = House.findByIdAndDelete(id).exec();
    return houseDeleted;
  };