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
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0){
     return res.status(200).json(recipes.slice(0,limit));
  }
  res.status(200).json(recipes); 
};

export const getOneRecipe = (req, res,next) => {
  const  id  = parseInt(req.params.id);
  const recipe = recipes.find((rec) => rec.id === id);
  if (!recipe) {
    const err = new Error (` the recipe with id ${id} doesn't exsit`);
    err.status=404;
    return next(err);
  }
  res.status(200).send(recipe);
};

export const addRecipe = (req, res,next) => {
  console.log(req.body);
  const {  title, ingredients, instructions } = req.body;
  const newRecipe = {
    id: recipes.length+1,
    title: title,
    ingredients: ingredients,
    instructions: instructions,
  };
  

  for (const [key, val] of Object.entries(newRecipe)) {
    if (!val) {
      const err = new Error(`Please include a value for ${key}`);
      err.status = 400;
      return next(err);
    }
  }
  recipes.push(newRecipe);
  res.status(201).json({ msg: "recipe added successfully!" });
};

export const updateRecipe = (req, res,next) => {
  const { title, ingredients, instructions } = req.body;
  const  id = req.params.id;
  const recipe = recipes.find((rec) => rec.id === parseInt(id));
  if (!recipe) {
    return next();
  }
  if (!title && !ingredients && !instructions) {
    const err = new Error("Please provide at least one field to update.");
    err.status = 400;
    return next(err);
  }

 
  if (title) recipe.title = title;
  if (ingredients) recipe.ingredients = ingredients;
  if (instructions) recipe.instructions = instructions;

  return res.status(200).json({ msg: "Recipe updated successfully!" });
  
  
};

export const deleteRecipe = (req, res,next) => {
  const { id } = req.params;
  const recipe = recipes.find((rec) => rec.id === parseInt(id));
  if (!recipe) {
     return next();
  }
  recipes.splice(recipes.indexOf(recipe), 1);
  res.status(200).send({ msg: "Recipe deleted successfully!" });
};
