import express from "express";
import * as todoController from "../controllers/todo-controller.js";

const router = express.Router();

router.route("/todos").post(todoController.post).get(todoController.getList);

router
  .route("/todos/:id")
  .get(todoController.get)
  .put(todoController.update)
  .delete(todoController.remove);

export default router;
