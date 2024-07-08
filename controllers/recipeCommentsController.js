const comments = [
  {
    id: 1,
    uId: 2,
    recId: 2,
    comment: "This comment",
    postedAt: Date.now(),
  },
  {
    id: 2,
    uId: 3,
    recId: 3,
    comment: "This comment",
    postedAt: Date.now(),
  },
  {
    id: 3,
    uId: 4,
    recId: 4,
    comment: "This comment",
    postedAt: Date.now(),
  },
  {
    id: 4,
    uId: 5,
    recId: 5,
    comment: "This comment",
    postedAt: Date.now(),
  },
  {
    id: 5,
    uId: 6,
    recId: 6,
    comment: "This comment",
    postedAt: Date.now(),
  },
  {
    id: 99,
    uId: 2,
    recId: 2,
    comment: "New Comment to Rec number 2 ",
    postedAt: Date.now(),
  },
];

// ==============List Recipe Comments==============

export const getRecipeComments = (req, res) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ msg: "please provide recipe id" });
  }
  const commentsForRecipe = comments.filter(
    (comment) => comment.recId === parseInt(recipeId)
  );
  res.status(200).json({ comments: commentsForRecipe });
};

// ==============Add Recipe Comment==============

export const addRecipeComment = (req, res) => {
  const { comment } = req.body;
  const { recipeId } = req.params;
  const newComment = {
    id: comments.length + 1,
    recId: recipeId,
    comment: comment,
    postedAt: Date.now(),
  };
  comments.push(newComment);
  res.status(201).json({ msg: "comment added successfully!" });
};

// ==============Update Recipe Comment==============

export const updateRecipeComment = (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const commentToUpdate = comments.find((com) => com.id === parseInt(id));
  if (!commentToUpdate) {
    return res.status(404).json({ msg: "Comment not found" });
  }
  commentToUpdate.comment = comment;
  res.status(200).json({ msg: "Comment updated successfully!" });
};

// ==============DELETE Recipe Comment==============
export const deleteRecipeComment = (req, res) => {
  const { id } = req.params;
  const index = comments.findIndex((com) => com.id === parseInt(id));
  if (index ===-1) {
    return res.status(404).json({ msg: "comment not found" });
  }
  comments.splice(index, 1);
  res.status(200).json({ msg: "comment deleted successfully!" });
};
