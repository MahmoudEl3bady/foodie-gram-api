import db from "../db/db.js";
export const getRecipes = async (req, res) => {
  const recipes = await db.raw("SELECT * FROM recipes");
  res.status(200).json(recipes);
};

export const getOneRecipe = async (req, res, next) => {
  const id = req.params.id;
  const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [id]);
  res.status(200).send(recipe);
};

export const addRecipe = async (req, res, next) => {
  const { user_id, title, ingredients, instructions } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //  await db("recipes").insert({user_id, title, ingredients, instructions });
  await db.raw(
    `INSERT INTO recipes (user_id,title,ingredients,instructions) VALUES (?,?,?,?)`,
    [user_id, title, ingredients, instructions]
  );
  res.status(201).json({ msg: "recipe added successfully!" });
};

export const updateRecipe = async (req, res, next) => {
  const id = req.params.id;
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

  updateValues.push(id);
  console.log(updateValues);
  const updateQuery = `UPDATE recipes SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  try {
    await db.raw(updateQuery, updateValues);

    res.status(200).send({ msg: "Recipe updated successfully!" });
  } catch (err) {
    next(err);
  }
};

export const deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await db.raw("SELECT * FROM recipes WHERE id = ?", [
      recipeId,
    ]);
    if (recipe.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await db.raw("DELETE FROM recipes WHERE id = ?", [recipeId]);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};
