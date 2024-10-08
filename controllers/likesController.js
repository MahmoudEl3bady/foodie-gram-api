import db from "../db/db.js";
import { getCurrentUserByUsername } from "./usersControllers.js";
//handling likes requests

export const addLike = async (req, res, next) => {
  try {
    const recipe_id = req.params.recipe_id;
    const user_name = req.payload.usrName;
    if (!recipe_id || !user_name) {
      return res.status(400).json({ msg: "User or recipe not found!" });
    }
    const currentUser = await  getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;
    await db.raw("INSERT INTO likes (user_id,recipe_id) VALUES (?,?)", [
      user_id,
      recipe_id,
    ]);
    res.status(200).json({ msg: "Like added successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteLike = async (req, res, next) => {
  try {
    const recipe_id = req.params.recipe_id;
    const user_name = req.payload.usrName;
    if (!recipe_id) {
      return res.status(400).json({ msg: "Recipe not found!" });
    }
    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;
    await db.raw("DELETE FROM likes WHERE recipe_id = ? AND user_id = ?", [
      recipe_id,
      user_id,
    ]);
    res.status(200).json({ msg: "Like deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const likeCounts = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  //TODO: check if user has liked the recipe before
  const likesCount = await db.raw(
    "SELECT count(*) as likes FROM likes WHERE recipe_id = ?",
    [recipe_id]
  );
  res.status(200).json(likesCount[0]);
};
