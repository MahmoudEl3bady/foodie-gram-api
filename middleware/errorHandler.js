
const errorHandler = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({msg:err.message||"Internal Server Error"});
};

export default errorHandler;