import questionService from "../services/question.service.js";

const questionController = {
  createQuestion: async (req, res) => {
    try {
      const { categoryId, title, type, values } = req.body;
      const result = await questionService.createQuestion(
        categoryId,
        title,
        type,
        values
      );
      if (result.status) {
        res.status(200).json({
          response_code: 200,
          result: result,
        });
      } else {
        res.status(400).json({
          response_code: 400,
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },
  updateQuestion: async (req, res) => {
    try {
      const { questionId, title, type, valuesData } = req.body;
      const result = await questionService.updateQuestion(
        questionId,
        title,
        type,
        valuesData
      );
      res.status(200).json({
        question: result.question,
        updatedValues: result.createdValues,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },
  getAllQuestions: async (req, res) => {
    try {
      const result = await questionService.getAllQuestions();
      if (result.status) {
        res.status(200).json({
          response_code: 200,
          result: result,
        });
      } else {
        res.status(400).json({
          response_code: 400,
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
  deleteQuestion: async (req, res) => {
    try {
      const result = await questionService.deleteQuestion(req.body.questionId);
      if (result.status) {
        res.status(200).json({
          response_code: 200,
          result: result,
        });
      } else {
        res.status(400).json({
          response_code: 400,
          result: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        response_code: 500,
        result: result,
      });
    }
  },
};

export default questionController;
