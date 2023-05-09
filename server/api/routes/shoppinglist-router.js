import express from "express";
import * as shoppinglistController from "../controllers/shoppinglist-controller.js";

const router = express.Router();

router.route("/shoppinglists").post(shoppinglistController.post).get(shoppinglistController.index);

router
  .route("/shoppinglists/:id")
  .get(shoppinglistController.get)
  .put(shoppinglistController.update)
  .delete(shoppinglistController.remove);

export default router;
