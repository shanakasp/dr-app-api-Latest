import * as categoryController from "../controllers/category.controller.js";
import express from "express";
import multer from "multer";
import { storage } from "../repository/category.repo.js";

const upload = multer({ storage: storage });

const router = express.Router();
router.get("/getAllCategories", categoryController.getAllCategories);
router.post("/placeCategory",upload.single('image'), categoryController.placeCategory);
router.get(
  "/getCategoryByID/:category_id",
  categoryController.findCategoryById
);
router.put(
  "/updateCategoryByID/:category_id",
  categoryController.UpdateCategoryById
);
router.delete(
  "/deleteCategoryByID/:category_id",
  categoryController.deleteCategoryById
);

export default router;
