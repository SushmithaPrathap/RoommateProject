import express from "express";
import * as announcementController from "../controllers/announcement-controller.js";

const router = express.Router();

router
  .route("/announcements")
  .post(announcementController.post)
  .get(announcementController.getList);

router
  .route("/announcements/:id")
  .get(announcementController.get)
  .put(announcementController.update)
  .delete(announcementController.remove);

export default router;
