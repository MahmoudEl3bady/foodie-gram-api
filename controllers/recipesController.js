import db from "../db/db.js";
import { customError } from "../utility/customError.js";
import { getCurrentUserByUsername } from "./usersControllers.js";
export const getRecipes = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = Number(page);
  const pageLimit = Number(limit);
  const offset = (pageNumber - 1) * pageLimit;

  try {
    const recipes = await db.raw("SELECT * FROM recipes LIMIT ? OFFSET ?", [
      pageLimit,
      offset,
    ]);

    const totalRecipes = await db.raw("SELECT count(*) as total FROM recipes");

    const totalPages = Math.ceil(totalRecipes[0].total / pageLimit);
    if(pageNumber>totalPages){
      throw new customError("Page not found!",404);
    }
    res.status(200).json({
      data: recipes,
      meta: {
        totalPages,
        currentPage: pageNumber,
        itemPerPage: pageLimit,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOneRecipe = async (req, res, next) => {
  const id = req.params.id;
  try {
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [id]);
    if (recipe.length === 0) {
      throw new customError("Recipe Not found", 404);
    }
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
};

export const addRecipe = async (req, res, next) => {
  const user_name = req.payload.usrName;
  if (!user_name) {
    return res.status(400).json({ msg: "User not found!" });
  }
  const currentUser = await getCurrentUserByUsername(user_name);
  const user_id = currentUser.id;
  const { title, ingredients, instructions } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const [recipeId] = await db("recipes").insert(
    { user_id, title, ingredients, instructions },
    ["id"] // Returning the ID of the inserted recipe
  );

  const response = { msg: "Recipe added successfully!" };
  if (recipeId) {
    response.recipe = recipeId;
  }

  res.status(201).json(response);
};

export const updateRecipe = async (req, res, next) => {
  const recipeId = req.params.id;
  const { title, ingredients, instructions } = req.body;

  // Check if at least one field is provided
  if (!title && !ingredients && !instructions) {
    return res.status(400).json({
      error:
        "Please provide at least one field to update (title, ingredients, instructions)",
    });
  }

  // Prepare the update query dynamically based on provided fields
  const updateFields = [];
  const updateValues = [];

  if (title) {
    updateFields.push("title = ?");
    updateValues.push(title);
  }
  if (ingredients) {
    updateFields.push("ingredients = ?");
    updateValues.push(ingredients);
  }
  if (instructions) {
    updateFields.push("instructions = ?");
    updateValues.push(instructions);
  }

  updateValues.push(recipeId);
  console.log(updateValues);
  const updateQuery = `UPDATE recipes SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  try {
    await db.raw(updateQuery, updateValues);
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipeId,
    ]);

    if (recipe.length === 0) {
      throw new customError("Recipe Not found!", 404);
    }
    res.status(200).send({ msg: "Recipe updated successfully!" });
  } catch (err) {
    next(err);
  }
};

export const deleteRecipe = async (req, res, next) => {
  const recipeId = req.params.id;

  try {
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipeId,
    ]);
    if (recipe.length === 0) {
      throw new customError("Recipe not found!", 404);
    }

    await db.raw("DELETE FROM recipes WHERE id = ?", [recipeId]);
    res.status(200).json({ msg: "Recipe deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
