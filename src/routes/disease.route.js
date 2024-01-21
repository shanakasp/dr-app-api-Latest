import express from "express";
import * as diseaseController from "../controllers/disease.controller.js";

const router = express.Router();
router.post("/placeDisease", diseaseController.placeDisease);
router.get("/getAllDiseases", diseaseController.getAllDiseases);
router.put("/updateDisease", diseaseController.UpdateDiseaseById);
router.delete(
  "/deleteDiseaseById/:disease_id",
  diseaseController.deleteDiseaseById
);

export default router;
