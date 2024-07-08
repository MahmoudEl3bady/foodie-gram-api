const dislikes =[
    {
        uid:6,
        rid:9
    },
    {
        uid:7,
        rid:8
    },
    {
        uid:9,
        rid:10
    },
    {
        uid:13,
        rid:15
    },
    {
        uid:6,
        rid:7
    },
    {
        uid:9,
        rid:8
    },
];




//handling dislikes requests


export const addDislike = (req, res, next) => {
  const { uid, rid } = req.body;

  const dislike = {
    uid: uid,
    rid: rid,
  };

  // Check for missing values
  for (const [key, val] of Object.entries(dislike)) {
    if (!val) {
      const err = new Error(`pls include value of ${key}`);
      return next(err);
    }
  }
  // Add dislike to the dislikes array
  dislikes.push(dislike);

  // Count the number of dislikes for the specific rid
  const dislikeCounts = dislikeslikes.filter(
    (recipe) => recipe.rid === like.rid
  );

  res.status(200).json({ dislikes: dislikeCounts.length });
};




export const deleteDislike = (req, res, next) => {
  const { uid, rid } = req.body;

  //checking missing values
  for (const [key, val] of Object.entries(req.body)) {
    if (!val) {
      const err = new Error(`pls include value of ${key}`);
      return next(err);
    }
  }
  //checking if like exsists
  const dislike = dislikeslikes.find(
    (dlike) => dlike.uid == uid && dlike.rid == rid
  );
  if (!dislike) {
    return next();
  }
  dislikes.splice(dislikes.indexOf(like), 1);
  // Count the number of likes for the specific rid
  const dislikeCounts = dislikes.filter((recipe) => recipe.rid === dislike.rid);

  res.status(200).json({ dislikes: dislikeCounts.length });
};




export const dislikeCounts = (req, res, next) => {
  const id = parseInt(req.body.id);
  // Count the number of likes for the specific rid
  const dislikeCounts = dislikes.filter((recipe) => recipe.rid === id);

  //checking if id exsits
  if (!dislikeCounts) {
    return next();
  }

  res.status(200).json({ dislikes: dislikeCounts.length });
};





export const isDisliked = (req, res, next) => {
  const { uid, rid } = req.body;

  //checking missing values
  for (const [key, val] of Object.entries(req.body)) {
    if (!val) {
      const err = new Error(`pls include value of ${key}`);
      return next(err);
    }
  }

  //checking if like exsists
  const dislike = dislikes.find(
    (dlike) => dlike.uid == uid && dlike.rid == rid
  );

  if (!dislike) {
    return next();
  }
  res.status(200).json({ isdisLiked: "true" });
};