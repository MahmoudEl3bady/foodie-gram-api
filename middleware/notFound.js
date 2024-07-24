const notFoundMiddleware = (req, res, next) => {
  res.json({ msg: `The endpoint ${req.originalUrl} is not found!` });
};

export default notFoundMiddleware;
