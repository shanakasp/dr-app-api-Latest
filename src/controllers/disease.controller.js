import * as diseaseService from "../services/disease.service.js";
import * as categoryService from "../services/category.service.js";
import { Disease } from "../models/model.js";

export const placeDisease = async (req, res) => {
  const { category_id, disease_name } = req.body;
  if (!category_id || !disease_name) {
    return res.status(200).json({
      response_code: 200,
      status: false,
      message: "Please enter all inputs!",
    });
  } else {
    try {
      const categoryValue = await categoryService.findCategoryById(
        req.body.category_id
      );
      if (categoryValue.status) {
        const val = await diseaseService.findDiseaseByName(req.body);
        if (val.status) {
          return res.status(400).json({
            response_code: 400,
            val,
          });
        } else {
          const result = await diseaseService.placeDisease(req.body);
          if (result.status) {
            return res.status(200).json({
              response_code: 200,
              result: result,
            });
          } else {
            return res.status(400).json({
              response_code: 400,
              result: result,
            });
          }
        }
      } else {
        return res.status(400).json({
          response_code: 400,
          result: categoryValue,
        });
      }
    } catch (error) {
      return res.status(408).json({
        response_code: 408,
        status: false,
        message: error.message,
      });
    }
  }
};
export const getAllDiseases = async (req, res) => {
  if (!req.body.category_id) {
    return res.status(400).json({
      response_code: 400,
      status: false,
      message: "please enter all inputs",
    });
  }
  try {
    const result = await diseaseService.getAllDiseases(req.body.category_id);
    if (result.status) {
      res.status(200).json({
        response_code: 200,
        result: result,
      });
    } else {
      res.status(404).json({
        response_code: 404,
        result: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      status: false,
      message: error.message,
    });
  }
};
export const UpdateDiseaseById = async (req, res) => {
  const { category_id, disease_name, disease_id } = req.body;
  if (!category_id || !disease_name || !disease_id) {
    return res.status(400).json({
      response_code: 400,
      status: false,
      message: "please enter all inputs",
    });
  } else {
    try {
      const categoryValue = await categoryService.findCategoryById(
        req.body.category_id
      );
      if (categoryValue.status) {
        const val = await diseaseService.findDiseaseById(req.body); //req.body.disease_id
        if (val.status) {
          const result = await diseaseService.UpdateDiseaseById(req.body);
          if (result.status) {
            return res.status(200).json({
              response_code: 200,
              result,
            });
          } else {
            return res.status(400).json({
              response_code: 400,
              result,
            });
          }
        } else {
          return res.status(400).json({
            response_code: 400,
            status: false,
            message: "can't update",
          });
        }
      } else {
        return res.status(400).json({
          response_code: 400,
          categoryValue,
        });
      }
    } catch (error) {
      return res.status(500).json({
        response_code: 500,
        status: false,
        message: error.message,
      });
    }
  }
};
export const deleteDiseaseById = async (req, res) => {
  const disease_id = req.params.disease_id;
  try {
    const disease = await Disease.findByPk(disease_id);
    if (!disease) {
      return res.status(404).json({
        response_code: 404,
        disease,
      });
    } else {
      const result = await diseaseService.deleteDiseaseById(disease_id);
      return res.status(200).json({
        response_code: 200,
        result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      status: false,
      message: error.message,
    });
  }
};
