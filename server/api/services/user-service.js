import User from "../models/user.js";

/**
 * @desc created a new user item
 */
export const save = (newUser) => {
  //mongoose docs - model.prototype.save()
  const user = new User(newUser);
  return user.save();
};

export const getList = async () => {
  let fullList = await User.find();
  return fullList;
};

export const remove = (id) => {
  const todoDeleted = User.findByIdAndDelete(id).exec();
  return todoDeleted;
};
