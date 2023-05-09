import Shoppinglist from "../models/shoppinglist.js";
/**
 * @desc created a new shoppinglist item 
 */
export const save = (newShoppinglist) => {
  //mongoose docs - model.prototype.save()
  const shoppinglist = new Shoppinglist(newShoppinglist);
  return shoppinglist.save();
};

/**
 * @desc gets the shoppinglists based on the query params passed
 */
export const search = async (query) => {
  const params = { ...query };
  const shoppinglistResult = Shoppinglist.find(params).exec(); //find does an database query, returns the result as promise
  return shoppinglistResult;
};

/**
 * @desc gets the specific shoppinglist item 
 */
export const get = (id) => {
  const shoppinglistItem = Shoppinglist.findById(id).exec();
  return shoppinglistItem;
};

/**
 * @desc update the spefic shoppinglist item
 */
export const update = (updateShoppinglist) => {
  updateShoppinglist.lastModifiedDate = new Date();
  const shoppinglistUpdated = Shoppinglist.findByIdAndUpdate(updateShoppinglist.id, updateShoppinglist, {
    new: true,
  }).exec();
  return shoppinglistUpdated;
};

/**
 * @desc deletes the speecific Shoppinglist item
 */
export const remove = (id) => {
  const shoppinglistDeleted = Shoppinglist.findByIdAndDelete(id).exec();
  return shoppinglistDeleted;
};
