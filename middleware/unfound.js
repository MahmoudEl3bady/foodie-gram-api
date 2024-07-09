const unfound = (req,res,next)=>{
    const err = new Error('un found');
   err.status = 404;
   next(err);
};
 
export default unfound ;