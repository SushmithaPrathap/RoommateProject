import Chorechart from "../models/chorechart.js";
/**
 * @desc created a new chorechart item 
 */
export const save = (newChorechart) => {
  //mongoose docs - model.prototype.save()
  const chorechart = new Chorechart(newChorechart);
  return chorechart.save();
};

/**
 * @desc gets the chorecharts based on the query params passed
 */
export const search = async (query) => {
  const params = { ...query };
  const chorechartResult = Chorechart.find(params).exec(); //find does an database query, returns the result as promise
  return chorechartResult;
};

/**
 * @desc gets the specific Chorechart item 
 */
export const get = (id) => {
  const chorechartItem = Chorechart.findById(id).exec();
  return chorechartItem;
};

/**
 * @desc update the spefic chorechart item
 */
export const update = (updateChorechart) => {
  updateChorechart.lastModifiedDate = new Date();
  const chorechartUpdated = Chorechart.findByIdAndUpdate(updateChorechart.id, updateChorechart, {
    new: true,
  }).exec();
  return chorechartUpdated;
};

/**
 * @desc deletes the speecific chorechart item
 */
export const remove = (id) => {
  const chorechartDeleted = Chorechart.findByIdAndDelete(id).exec();
  return chorechartDeleted;
};
