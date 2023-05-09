import express from "express";
import * as expenseController from "../controllers/expense-controller.js";

const router = express.Router();

router
  .route("/expenses")
  .post(expenseController.post)
  .get(expenseController.getList);
router.route("/expenses/search").get(expenseController.index);
router.route("/expenses/filter").get(expenseController.findDate);

router
  .route("/expenses/:id")
  .get(expenseController.get)
  .put(expenseController.update)
  .delete(expenseController.remove);

export default router;
