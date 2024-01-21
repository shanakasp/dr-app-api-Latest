import * as categoryService from "../services/category.service.js";

export const getAllCategories = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();
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
      message: error.message,
    });
  }
};

export const placeCategory = async (req, res) => {
  try {
    const val = await categoryService.findCategoryByName(
      req.body.category_name
    );

    if (val) {
      return res.status(401).json({
        response_code: 401,
        message: "Category already exists",
      });
    }

    const result = await categoryService.placeCategory(req.body);

    if (result.status) {
      return res.status(200).json({
        response_code: 200,
        result: result,
      });
    } else {
      return res.status(500).json({
        response_code: 500,
        message: "Internal Server Error",
        error: result.error, // Add the actual error to the response for debugging
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({
      response_code: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const findCategoryById = async (req, res) => {
  try {
    const result = await categoryService.findCategoryById(
      req.params.category_id
    );
    if (result.status) {
      return res.status(200).json({
        response_code: 200,
        result: result,
      });
    } else {
      return res.status(404).json({
        response_code: 404,
        result: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      response_code: 500,
      message: error.message,
    });
  }
};

export const UpdateCategoryById = async (req, res) => {
  const { category_name } = req.body;
  if (!category_name) {
    //checking the request  body
    return res.status(403).json({
      response_code: 403,
      message: "Please enter Category Name",
    });
  } else {
    try {
      const value = await categoryService.findCategoryById(
        req.params.category_id
      );
      if (!value.status) {
        return res.status(404).json({
          response_code: 404,
          message: value.message,
        });
      } else {
        const result = await categoryService.UpdateCategoryById(
          req.params.category_id,
          req.body
        );
        if (result.status) {
          const updatedValue = await categoryService.findCategoryById(
            req.params.category_id
          );
          return res.status(200).json({
            response_code: 200,
            result: {
              status: result.status,
              message: result.message,
              updatedValue: updatedValue,
            },
          });
        } else {
          return res.status({
            response_code: 400,
            result: result,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        response_code: 500,
        message: error.message,
      });
    }
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const value = await categoryService.findCategoryById(
      req.params.category_id
    );
    if (value.status) {
      const result = await categoryService.deleteCategoryById(
        req.params.category_id
      );
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
    } else {
      return res.status(400).json({
        response_code: 400,
        result: value,
      });
    }
  } catch (err) {
    return res.status(500).json({
      response_code: 500,
      status: false,
      message: err.message,
    });
  }
};
