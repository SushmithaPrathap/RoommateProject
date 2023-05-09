import expenseRouter from "./expense-router.js";
import shoppingListRouter from "./shoppinglist-router.js";
import chorechartRouter from "./chorechart-router.js";
import userRouter from "./userRoutes.js";
import houseRouter from "./house-router.js";
import todoRouter from "./todo-router.js";
import announcementRouter from "./announcement-router.js";
import "cors";

const BASE_URL = "/api/v1";

export default (app) => {
  app.use("/", expenseRouter);
  app.use("/", shoppingListRouter);
  app.use("/", chorechartRouter);
  app.use("/", houseRouter);
  app.use("/", announcementRouter);
  app.use("/", todoRouter);
  app.use(BASE_URL + "/users", userRouter);
};
