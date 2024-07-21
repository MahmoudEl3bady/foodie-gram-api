import db from "../db/db.js";
import { getCurrentUserByUsername } from "./usersControllers.js";

export const getUserFavorites = async (req, res) => {
  try {
    const user_name = req.payload.usrName;
    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;
    console.log(currentUser)

      const favoritesQuery = `
      SELECT 
        r.id, r.title, r.ingredients, r.instructions, r.image, r.posted_at 
      FROM 
        recipes r 
      JOIN 
        favorites f 
      ON 
        r.id = f.recipe_id 
      WHERE 
        f.user_id = ?
    `;
    const favorites = await db.raw(favoritesQuery ,[user_id]);
    console.log(favorites);
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addFavorite = async (req, res, next) => {
  const user_name = req.payload.usrName;
  const { recipe_id } = req.params;

  try {
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipe_id,
    ]);
    if (recipe.length===0) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;

    const existingFav = await db.raw(
      "SELECT recipe_id FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [user_id, recipe_id]
    );
    if (existingFav.length>0) {
      console.log("ssms",existingFav)
      // Adjusting to check the 'rows' property
      return res.status(409).json({ msg: "Favorite already exists" });
    }

    await db.raw("INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)", [
      user_id,
      recipe_id,
    ]);
    res.status(201).json({ msg: "Favorite added successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteFavorite = async (req, res, next) => {
  const user_name = req.payload.usrName;
  const { recipe_id } = req.params;

  try {
    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;

    const existingFav = await db.raw(
      "SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [user_id, recipe_id]
    );
    if (existingFav.length === 0) {
      return res.status(404).json({ msg: "Favorite not found" });
    }

    await db.raw("DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?", [
      user_id,
      recipe_id,
    ]);
    res.status(200).json({ msg: "Favorite deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const isFavorite = async (req, res) => {
  const user_name = req.payload.usrName;
  const { recipe_id } = req.params;

  try {
    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;

    const existingFav = await db.raw(
      "SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?",
      [user_id, recipe_id]
    );
    if (existingFav.length === 0) {
      return res.status(200).json({ isFavorite: false });
    }
    res.status(200).json({ isFavorite: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
