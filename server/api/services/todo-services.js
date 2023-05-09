import Todo from "../models/todo.js";
/**
 * @desc created a new todo item
 */
export const save = (newTodo) => {
  //mongoose docs - model.prototype.save()
  const todo = new Todo(newTodo);
  return todo.save();
};

/**
 * @desc gets the todos based on the query params passed
 */
export const search = async (query) => {
  const params = { ...query };
  const todoResult = Todo.find(params).exec(); //find does an database query, returns the result as promise
  return todoResult;
};

/**
 * @desc gets the specific Todo item
 */
export const get = (id) => {
  const todoItem = Todo.findById(id).exec();
  return todoItem;
};

export const getList = async () => {
  let fullList = await Todo.find();
  return fullList;
};

/**
 * @desc update the spefic todo item
 */
export const update = (updateTodo) => {
  updateTodo.lastModifiedDate = new Date();
  const todoUpdated = Todo.findByIdAndUpdate(updateTodo.id, updateTodo, {
    new: true,
  }).exec();
  return todoUpdated;
};

/**
 * @desc deletes the speecific todo item
 */
export const remove = (id) => {
  const todoDeleted = Todo.findByIdAndDelete(id).exec();
  return todoDeleted;
};
