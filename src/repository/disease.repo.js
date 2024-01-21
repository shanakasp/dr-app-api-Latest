import { Disease } from "../models/model.js";

export const placeDisease = async (request) => {
  try {
    const result = await Disease.create(request);
    return result;
  } catch (err) {
    throw err;
  }
};
export const findDiseaseByName = async (request) => {
  try {
    const result = await Disease.findOne({
      where: {
        category_id: request.category_id,
        disease_name: request.disease_name,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
export const findDiseaseById = async (request) => {
  try {
    const result = await Disease.findOne({
      where: {
        category_id: request.category_id,
        disease_id: request.disease_id,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
export const getAllDiseases = async (id) => {
  try {
    const result = await Disease.findAll({
      where: {
        category_id: id,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
export const UpdateDiseaseById = async (request) => {
  try {
    const result = await Disease.update(
      { disease_name: request.disease_name },
      {
        where: {
          disease_id: request.disease_id,
        },
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
};
export const deleteDiseaseById = async (disease_id) => {
  try {
    const result = await Disease.destroy({
      where: {
        disease_id: disease_id,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
