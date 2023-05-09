import express from "express";
import * as chorechartController from "../controllers/chorechart-controller.js";

const router = express.Router();

router.route("/chores").post(chorechartController.post).get(chorechartController.index);

router
  .route("/chores/:id")
  .get(chorechartController.get)
  .put(chorechartController.update)
  .delete(chorechartController.remove);

export default router;
