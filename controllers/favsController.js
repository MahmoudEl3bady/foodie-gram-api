import db from "../db/db.js";
import { getCurrentUserByUsername } from "./usersControllers.js";
// favorites  handlers

export const addFavorite = async (req, res, next) => {
  const user_name = req.user.usrName;
  const recipeId = 1;

  try {
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipeId,
    ]);
    if (recipe.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const currentUser = getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;
    const existingFav = await db.raw(
      "SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [user_id, recipeId]
    );
    if (existingFav.length > 0) {
      return res.status(409).json({ message: "Favorite already exists" });
    }
    await db.raw("INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)", [
      user_id,
      recipeId,
    ]);
    res.status(201).json({ message: "Favorite added successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteFavorite = async (req, res, next) => {
  const user_name = req.user.usrName;
  const recipe_id = 1;
  try {
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipe_id,
    ]);
    if (recipe.length === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    const currentUser = getCurrentUserByUsername(user_name);  
    const user_id = currentUser.id;
    await db.raw("DELETE FROM favorites WHERE user_id = ? AND recipe_id = ? ", [
      user_id,
      recipe_id,
    ]);
    res.status(200).json({ msg: "Favorite deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getUserFavorites = async (req, res) => {
  const user_name = req.user.usrName;
  try {
    const currentUser = getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;
    const favorites = await db.raw(
      "SELECT * FROM favorites JOIN recipes WHERE  favorites.user_id = ? AND favorites.recipe_id = recipes.id;",
      [user_id]
    );
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
