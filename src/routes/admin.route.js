import express from "express";
import adminController from "../controllers/admin.controller.js";

const router = express.Router();
router.post(
  "/changeSuperAdminPassword/:id",
  adminController.changeSuperAdminPassword
);
router.post("/login", adminController.adminLogin);

export default router;
