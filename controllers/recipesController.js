const recipes = [
  {
    id: 1,
    title: "Spicy Arrabiata Penne",
    ingredients:
      "Penne pasta, olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
    instructions:
      "Boil pasta, add olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
  },
  {
    id: 2,
    title: "Spicy Arrabiata Penne",
    ingredients:
      "Penne pasta, olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
    instructions:
      "Boil pasta, add olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
  },
  {
    id: 3,
    title: "Spicy Arrabiata Penne",
    ingredients:
      "Penne pasta, olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
    instructions:
      "Boil pasta, add olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
  },
  {
    id: 4,
    title: "Spicy Arrabiata Penne",
    ingredients:
      "Penne pasta, olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
    instructions:
      "Boil pasta, add olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
  },
  {
    id: 5,
    title: "Spicy Arrabiata Penne",
    ingredients:
      "Penne pasta, olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
    instructions:
      "Boil pasta, add olive oil, garlic, salt, pepper, garlic powder, onion, pepper, chicken, artichokes, feta cheese, oregano, black pepper",
  },
];

export const getRecipes = (req, res) => {
  res.status(200).send(recipes);
};

export const getOneRecipe = (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((rec) => rec.id.toString() === id);
  if (!recipe) {
    return res.status(404).send({ msg: "Recipe Not Found !" });
  }
  res.status(200).send(recipe);
};

export const addRecipe = (req, res) => {
  console.log(req.body);
  const { id, title, ingredients, instructions } = req.body;
  const newRecipe = {
    id: id,
    title: title,
    ingredients: ingredients,
    instructions: instructions,
  };
  recipes.push(newRecipe);
  res.status(201).send({ msg: "recipe added successfully!" });
};

export const updateRecipe = (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const { id } = req.params;
  const recipe = recipes.find((rec) => rec.id === parseInt(id));
  if (!recipe) {
    return res.status(404).send({ msg: "Recipe Not Found" });
  }
  recipe.title = title;
  recipe.ingredients = ingredients;
  recipe.instructions = instructions;

  res.status(200).send({ msg: "Recipe updated successfully !" });
};

export const deleteRecipe = (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((rec) => rec.id === parseInt(id));
  if (!recipe) {
    return res.status(404).send({ msg: "Recipe Not found" });
  }
  recipes.splice(recipes.indexOf(recipe), 1);
  res.send({ msg: "Recipe deleted successfully!" }).status(200);
};
