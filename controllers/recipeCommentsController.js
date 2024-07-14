import db from "../db/db.js";
import { getCurrentUserByUsername } from "./usersControllers.js";
// ==============List Recipe Comments with Error Handling==============
export const getRecipeComments = async (req, res) => {
  try {
    const { recipe_id } = req.params;
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [recipe_id]);
    if (!recipe) {
      console.log(recipe)
     throw new Error("Recipe Not found")
    }
    const comments = await db.raw("SELECT * FROM comments WHERE recipe_id = ?", [recipe_id]);
    if (!comments) {
      return res.status(404).json({ msg: "No comments found for this recipe" });
    }
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error:"server Error " });
  }
};

// ==============Add Recipe Comment with Error Handling==============
export const addRecipeComment = async (req, res) => {
  try {
    const { recipe_id } = req.params;
    const user_name = req.user.usrName;
    const { comment } = req.body;
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [recipe_id]);
    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }
    if (!comment) {
      return res.status(400).json({ msg: "Comment field is required" });
    }
     const currentUser = getCurrentUserByUsername(user_name); 
     const user_id = currentUser.id;
    await db.raw("INSERT INTO comments (user_id,recipe_id,comment) VALUES (?,?,?)", [user_id, recipe_id, comment]);
    res.status(201).json({ msg: "Comment added successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
};

// ==============Update Recipe Comment with Error Handling==============
export const updateRecipeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ msg: "Comment field is required" });
    }
    await db.raw("UPDATE comments SET comment = ? WHERE id = ?", [comment, id]);
    res.status(200).json({ msg: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ==============DELETE Recipe Comment with Error Handling==============
export const deleteRecipeComment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.raw("DELETE FROM comments WHERE id = ?", [id]);
    res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

