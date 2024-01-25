import multer from "multer";
import { Category } from "../models/model.js";

// Function to retrieve all categories
export const getAllCategories = async () => {
  try {
    const categories = await Category.findAll({});
    return categories;
  } catch (err) {
    throw err;
  }
};

// Set up Multer for handling file uploads
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads"); // Define the directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Function to add a new category
export const placeCategory = async (request) => {
  try {
    // Create a new category record in the database
    const result = await Category.create({
      category_name: request.category_name,
      image_url: request.image_url,
    });

    return result;
  } catch (err) {
    throw err;
  }
};

// Function to find categories by name
export const findCategoryByName = async (name) => {
  try {
    const result = await Category.findAll({
      where: {
        category_name: name,
      },
    });

    return result.length;
  } catch (err) {
    throw err;
  }
};

// Function to find a category by ID
export const findCategoryById = async (id) => {
  try {
    const result = await Category.findOne({
      where: {
        category_id: id,
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};

// Function to update a category by ID
export const UpdateCategoryById = async (id, request) => {
  try {
    // Update the category information in the database
    const result = await Category.update(
      {
        category_name: request.category_name,
        image_url: request.image_url,
      },
      {
        where: {
          category_id: id,
        },
      }
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// Function to delete a category by ID
export const deleteCategoryById = async (id) => {
  try {
    // Delete the category from the database
    const result = await Category.destroy({
      where: {
        category_id: id,
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};
