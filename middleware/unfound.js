const unfound = (req,res,next)=>{
    const err = new Error('Recipe Not Found');
   err.status = 404;
   next(err);
};
 
export default unfound ;