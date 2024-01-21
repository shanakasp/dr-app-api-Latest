import express from "express";
import questionController from "../controllers/question.controller.js";

const router = express.Router();
router.post("/addQuestion", questionController.createQuestion);
router.put("/updateQuestion", questionController.updateQuestion);
router.get("/getAllQuestions", questionController.getAllQuestions);
router.delete("/deleteQuestion", questionController.deleteQuestion);

export default router;
