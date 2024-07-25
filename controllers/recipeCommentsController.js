import db from "../db/db.js";
import { getCurrentUserByUsername } from "./usersControllers.js";
import { customError } from "../utility/customError.js";
// ==============List Recipe Comments with Error Handling==============
export const getRecipeComments = async (req, res,next) => {
  try {
    const { recipe_id } = req.params;
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipe_id,
    ]);
    if (recipe.length === 0) {
      throw new customError("Recipe Not found", 404);
    }
    const comments = await db.raw(
      "SELECT * FROM comments WHERE recipe_id = ?",
      [recipe_id]
    );
    if (!comments) {
      return res.status(404).json({ msg: "No comments found for this recipe" });
    }
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// ==============Add Recipe Comment with Error Handling==============
export const addRecipeComment = async (req, res, next) => {
  try {
    const { recipe_id } = req.params;
    const user_name = req.payload.usrName;
    const { comment } = req.body;
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipe_id,
    ]);
    if (!recipe.length) {
      throw new customError("Recipe Not found", 404);
    }
    if (!comment) {
      throw new customError("Comment field is required", 400);
    }
    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;

    await db.raw(
      "INSERT INTO comments (user_id,recipe_id,comment) VALUES (?,?,?)",
      [user_id, recipe_id, comment]
    );
    const response = { msg: "Comment added successfully!" };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// ==============Update Recipe Comment with Error Handling==============
export const updateRecipeComment = async (req, res, next) => {
  try {
    const { id, recipe_id } = req.params;
    console.log(recipe_id, id);
    const { comment } = req.body;
    const recipe = await db.raw("SELECT * FROM comments WHERE id = ?", [
      recipe_id,
    ]);
    if (!recipe.length) {
      throw new customError("Recipe Not found", 404);
    }
    const oldComment = await db.raw(
      "SELECT * FROM comments WHERE id = ? AND recipe_id=?",
      [id, recipe_id]
    );
    console.log(oldComment);
    if (oldComment.length === 0) {
      throw new customError("Comment Not found!", 401);
    }
    if (!comment) {
      throw new customError("Comment field is required!");
    }
    await db.raw("UPDATE comments SET comment = ? WHERE id = ?", [comment, id]);
    res.status(200).json({ msg: "Comment updated successfully" });
  } catch (error) {
    next(error);
  }
};

// ==============DELETE Recipe Comment with Error Handling==============
export const deleteRecipeComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exists = await db.raw("SELECT * FROM comments WHERE id = ?", [id]);
    if (exists.length === 0) {
      throw new customError("Comment not found!", 404);
    }
    await db.raw("DELETE FROM comments WHERE id = ?", [id]);
    res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
