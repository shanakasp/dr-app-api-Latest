import * as diseaseRepository from "../repository/disease.repo.js";

export const placeDisease = async (request) => {
  try {
    const result = await diseaseRepository.placeDisease(request);
    if (result == null) {
      return { status: false, message: "Disease not places!" };
    } else {
      return {
        status: true,
        message: "Disease placed successfully!",
        data: result,
      };
    }
  } catch (err) {
    throw err;
  }
};
export const findDiseaseByName = async (request) => {
  try {
    const result = await diseaseRepository.findDiseaseByName(request);
    if (!result) {
      return {
        status: false,
        message: "The disease is not found for this category!",
      };
    } else {
      return { status: true, message: "Disease is already exist!" };
    }
  } catch (err) {
    throw err;
  }
};
export const findDiseaseById = async (request) => {
  try {
    const result = await diseaseRepository.findDiseaseById(request);
    if (!result) {
      return {
        status: false,
        message: "Disease not found!",
      };
    } else {
      return { status: true, message: "Disease id is already exist!" };
    }
  } catch (err) {
    throw err;
  }
};
export const getAllDiseases = async (id) => {
  try {
    const result = await diseaseRepository.getAllDiseases(id);
    console.log(result.length);
    if (result.length == 0) {
      return { status: false, message: "No diseases in database!" };
    } else {
      return {
        status: true,
        message: "All diseases get successfully!",
        diseases: result,
      };
    }
  } catch (err) {
    throw err;
  }
};
export const UpdateDiseaseById = async (request) => {
  try {
    const result = await diseaseRepository.UpdateDiseaseById(request);
    if (result) {
      return { status: true, message: "Updated successfully!" };
    } else {
      return { status: false, message: "Not updated!" };
    }
  } catch (err) {
    throw err;
  }
};
export const deleteDiseaseById = async (disease_id) => {
  try {
    const result = await diseaseRepository.deleteDiseaseById(disease_id);
    if (result) {
      return { status: true, message: "Deleted successfully!" };
    } else {
      return { status: false, message: "Can't delete!" };
    }
  } catch (error) {
    throw error;
  }
};
