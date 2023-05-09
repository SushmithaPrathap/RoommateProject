import express from "express";
import * as houseController from "../controllers/house-controller.js";

const router = express.Router();

router.route("/house").post(houseController.post).get(houseController.index);

router
  .route("/house/:id")
  .get(houseController.get)
  .put(houseController.update)
  .delete(houseController.remove);

export default router;
