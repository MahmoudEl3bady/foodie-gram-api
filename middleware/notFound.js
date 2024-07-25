import {customError} from "../utility/customError.js";

const notFoundMiddleware = (req, res, next) => {
  const err = new customError(`The route ${req.originalUrl} was not found!`, 404);
  next(err); 
};

export default notFoundMiddleware;
