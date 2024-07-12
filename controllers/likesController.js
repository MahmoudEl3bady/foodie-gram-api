import db from "../db/db.js";

//handling likes requests

export const addLike = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  const { user_id } = req.body;
  if (!recipe_id || !user_id) {
    return res.status(400).json({ msg: "User or recipe not found!" });
  }
  await db.raw("INSERT INTO likes (user_id,recipe_id) VALUES (?,?)", [
    user_id,
    recipe_id,
  ]);
  res.status(200).json({ msg: "like added successfully!" });
};

export const deleteLike = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
    const  user_id  = 1;
  if (!recipe_id) {
    return res.status(400).json({ msg: "Recipe not found!" });
  }
  await db.raw("DELETE FROM likes WHERE recipe_id = ? AND user_id = ?", [recipe_id,user_id]);
  res.status(200).json({ msg: "like deleted successfully!" });
};

export const likeCounts = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  //TODO: check if user has liked the recipe before
  const likesCount = await db.raw(
    "SELECT count(*) as likes FROM likes WHERE recipe_id = ?",
    [recipe_id]
  );
  res.status(200).json(likesCount);
};

