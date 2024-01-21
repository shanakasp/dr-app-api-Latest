import * as categoryRepository from "../repository/category.repo.js";

export const getAllCategories = async () => {
  try {
    const result = await categoryRepository.getAllCategories();
    if (result.length == 0) {
      return { status: false, message: "No categories in database!" };
    } else {
      return {
        status: true,
        message: "All categories get successfully!",
        data: result,
      };
    }
  } catch (err) {
    throw err;
  }
};
export const placeCategory = async (request) => {
  try {
    const result = await categoryRepository.placeCategory(request);
    if (result == null) {
      return { status: false, message: "Category not places!" };
    } else {
      return {
        status: true,
        message: "Category placed successfully!",
        data: result,
      };
    }
  } catch (err) {
    throw err;
  }
};
export const findCategoryByName = async (name) => {
  try {
    const result = await categoryRepository.findCategoryByName(name);
    if (result > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};
export const findCategoryById = async (id) => {
  try {
    const result = await categoryRepository.findCategoryById(id);
    if (result === null) {
      return { status: false, message: "Category not found!" };
    } else {
      return { status: true, message: "Find Successfully!", data: result };
    }
  } catch (err) {
    throw err;
  }
};
export const UpdateCategoryById = async (id, request) => {
  try {
    const result = await categoryRepository.UpdateCategoryById(id, request);
    if (result) {
      return { status: true, message: "Updated Successfully!" };
    } else {
      return { status: false, message: "Not Updated!" };
    }
  } catch (err) {
    throw err;
  }
};
export const deleteCategoryById = async (id) => {
  try {
    const result = await categoryRepository.deleteCategoryById(id);
    if (result) {
      return { status: true, message: "Deleted Successfully!" };
    } else {
      return { status: false, message: "Not Deleted!" };
    }
  } catch (err) {
    throw err;
  }
};
