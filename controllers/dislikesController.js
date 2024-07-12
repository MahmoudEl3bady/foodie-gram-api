import db from "../db/db.js"
export const addDislike = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  const { user_id } = req.body;
  if (!recipe_id || !user_id) {
    return res.status(400).json({ msg: "User or recipe not found!" });
  }
  try {
    await db.raw("INSERT INTO dislikes (user_id, recipe_id) VALUES (?, ?)", [
      user_id,
      recipe_id,
    ]);
    res.status(200).json({ msg: "Dislike added successfully!" });
  } catch (error) {
    next(error);
  }
};


// Delete a dislike
export const deleteDislike = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  const { user_id } = req.body;
  if (!recipe_id || !user_id) {
    return res.status(400).json({ msg: "User or recipe not found!" });
  }
  try {
    await db.raw("DELETE FROM dislikes WHERE recipe_id = ? AND user_id = ?", [
      recipe_id,
      user_id,
    ]);
    res.status(200).json({ msg: "Dislike deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

// Get dislike count for a recipe
export const dislikeCounts = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  try {
    const dislikesCount = await db.raw(
      "SELECT count(*) as dislikes FROM dislikes WHERE recipe_id = ?",
      [recipe_id]
    );
    res.status(200).json(dislikesCount[0]);
  } catch (error) {
    next(error);
  }
};
