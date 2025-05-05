import db from "../db/db.js";
import { getCurrentUserByUsername } from "./usersControllers.js";
import { customError } from "../utility/customError.js";

export const addDislike = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  const user_name = req.payload.usrName;

  try {
    // Check if recipe exists
    const recipe = await db("recipes").where({ id: recipe_id }).first();
    if (!recipe) {
      throw new customError("Recipe not found!", 404);
    }

    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;

    // Check if user already disliked this recipe
    const existingDislike = await db("dislikes")
      .where({ user_id, recipe_id })
      .first();

    if (existingDislike) {
      throw new customError("Already disliked this recipe", 400);
    }

    await db("dislikes").insert({ user_id, recipe_id });
    res.status(200).json({ msg: "Dislike added successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteDislike = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  const user_name = req.payload.usrName;

  try {
    // Check if recipe exists
    const recipe = await db("recipes").where({ id: recipe_id }).first();
    if (!recipe) {
      throw new customError("Recipe not found!", 404);
    }

    const currentUser = await getCurrentUserByUsername(user_name);
    const user_id = currentUser.id;

    // Check if dislike exists
    const existingDislike = await db("dislikes")
      .where({ user_id, recipe_id })
      .first();

    if (!existingDislike) {
      throw new customError("Dislike not found", 404);
    }

    await db("dislikes").where({ recipe_id, user_id }).delete();

    res.status(200).json({ msg: "Dislike deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const dislikeCounts = async (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  try {
    // Check if recipe exists
    const recipe = await db("recipes").where({ id: recipe_id }).first();
    if (!recipe) {
      throw new customError("Recipe not found!", 404);
    }

    const result = await db("dislikes")
      .where({ recipe_id })
      .count("* as count")
      .first();

    res.status(200).json({ dislikes: result.count });
  } catch (error) {
    next(error);
  }
};
