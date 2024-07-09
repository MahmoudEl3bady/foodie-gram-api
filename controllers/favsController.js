const favs =[
    {
        uid:1,
        rid:1
    },
    {
        uid:3,
        rid:2
    },
    {
        uid:1,
        rid:4
    },
    {
        uid:2,
        rid:5
    },
    {
        uid:4,
        rid:4
    },
    {
        uid:2,
        rid:2
    },
];



//handling favs requests


export const addFavorite = (req, res, next) => {
  const { uid, rid } = req.body;

  const fav = {
    uid: uid,
    rid: rid,
  };

  // Check for missing values
  for (const [key, val] of Object.entries(fav)) {
    if (!val) {
      const err = new Error(`pls include value of ${key}`);
      return next(err);
    }
  }
  // Add like to the likes array
  favs.push(fav);

  // Count the number of likes for the specific rid
  const favCounts = favs.filter((recipe) => recipe.rid === fav.rid);

  res.status(200).json({ favs: favCounts.length });
};




export const deleteFavorite = (req, res, next) => {
  const { uid, rid } = req.body;

  //checking missing values
  for (const [key, val] of Object.entries(req.body)) {
    if (!val) {
      const err = new Error(`pls include value of ${key}`);
      return next(err);
    }
  }
  //checking if like exsists
  const fav = favs.find((fav) => fav.uid == uid && fav.rid == rid);
  if (!fav) {
    return next();
  }
  favs.splice(favs.indexOf(fav), 1);
  // Count the number of likes for the specific rid
  const favCounts = favs.filter((recipe) => recipe.rid === like.rid);

  res.status(200).json({ favs: favCounts.length });
};




export const favoriteCounts = (req, res, next) => {
  const id = parseInt(req.body.id);
  // Count the number of likes for the specific rid
  const favCounts = favs.filter((recipe) => recipe.rid === id);

  //checking if id exsits
  if (!favCounts) {
    return next();
  }

  res.status(200).json({ favs: favCounts.length });
};






export const isFavorite = (req, res, next) => {
  const { uid, rid } = req.body;

  //checking missing values
  for (const [key, val] of Object.entries(req.body)) {
    if (!val) {
      const err = new Error(`pls include value of ${key}`);
      return next(err);
    }
  }

  //checking if like exsists
  const fav = favs.find((fav) => fav.uid == uid && fav.rid == rid);

  if (!fav) {
    return next();
  }
  res.status(200).json({ isfav: "true" });
};