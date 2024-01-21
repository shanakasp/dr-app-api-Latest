import sequelize from "../../config/db.connection.js";
import { Questions, Value } from "../models/model.js";

const questionRepo = {
  createQuestion: async (categoryId, title, type, valuesData) => {
    try {
      // Create the question under a specific category
      await sequelize.sync();
      const question = await Questions.create(
        {
          category_id: categoryId,
          title: title,
          type: type,
          values: valuesData,
        },
        {
          include: [Value],
        }
      );
      return question;
    } catch (error) {
      throw error;
    }
  },
  getAllQuestions: async () => {
    try {
      const allQuestions = await Questions.findAll({
        include: [Value],
      });
      return allQuestions;
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (questionId) => {
    try {
      await sequelize.sync();
      const deletedQuestion = await Questions.destroy({
        where: {
          id: questionId,
        },
        include: [Value],
      });
      return deletedQuestion;
    } catch (error) {
      throw error;
    }
  },
  // TODO: updateQuestion not working still
  updateQuestion: async (questionId, title, type, valuesData) => {
    try {
      //update the question under a specific category
      await sequelize.sync();
      const [updatedRowsCount] = await Questions.update(
        {
          title: title,
          type: type,
        },
        {
          where: { id: questionId },
        }
      );
      console.log(updatedRowsCount);
      if (updatedRowsCount === 0) {
        throw new Error("Question not updated");
      }
      //Find or create values associated with the question
      const question = await Questions.findByPk(questionId);
      if (!question) {
        throw new Error("Question not found");
      }
      console.log(question.id);
      await sequelize.sync();
      const deleteValue = await Value.destroy({
        where: {
          question_id: question.id
        }
      })
      const values = Array.isArray(valuesData) ? valuesData : [];
      console.log(values);
      const updatedValues = (values.map( async (value) => {
        await sequelize.sync();
        console.log("hello2");
        const [updatedValueCount] = await Value.update([
          {
            value: value.value,
          },{
            where: {question_id: question.id}
          }
        ])
        console.log(updatedValueCount);
        return updatedValueCount;
      }));
      console.log(updatedValues);
      return { question, updatedValues };
    } catch (error) {
      throw error;
    }
  },
};

export default questionRepo;
