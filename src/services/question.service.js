import questionRepo from "../repository/question.repo.js";

const questionService = {
  createQuestion: async (categoryId, title, type, valuesData) => {
    try {
      const question = await questionRepo.createQuestion(
        categoryId,
        title,
        type,
        valuesData
      );
      if (question) {
        return {
          status: true,
          message: "Question create successfully",
          question: question,
        };
      } else {
        return { status: false, message: "Question create failed!" };
      }
    } catch (error) {
      throw error;
    }
  },
  updateQuestion: async (questionId, title, type, valuesData) => {
    try {
      const { question, createdValues } = await questionRepo.updateQuestion(
        questionId,
        title,
        type,
        valuesData
      );
      return { question, createdValues };
    } catch (error) {
      throw error;
    }
  },
  getAllQuestions: async () => {
    try {
      const result = await questionRepo.getAllQuestions();
      if (result.length == 0) {
        return { status: false, message: "No any questions found" };
      } else {
        return {
          status: true,
          message: "All questions get successfully",
          questions: result,
        };
      }
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (questionId) => {
    try {
      const result = await questionRepo.deleteQuestion(questionId);
      if (result) {
        return {
          status: true,
          message: "Question delete successfully",
          deletedData: result.deleteQuestion,
        };
      } else {
        return { status: false, message: "Deletion failed" };
      }
    } catch (error) {
      throw error;
    }
  },
};

export default questionService;
