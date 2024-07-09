
const likes =[
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


//handling likes requests


export const addLike = (req, res, next) => {
    const {uid,rid} = req.body;
  
    const like = {
        uid:uid,
        rid:rid
    };

    // Check for missing values
    for (const [key, val] of Object.entries(like)){
        if(!val){
         const err = new Error(`pls include value of ${key}`);
         return next(err);
        }
     }
    // Add like to the likes array
    likes.push(like);

    // Count the number of likes for the specific rid
    const likeCounts = likes.filter(recipe => recipe.rid ===like.rid );

    res.status(200).json({ likes: likeCounts.length });
};





export const deleteLike = (req,res,next)=>{
    const{uid,rid}=req.body;
    
    //checking missing values
    for (const [key, val] of Object.entries(req.body)){
        if(!val){
         const err = new Error(`pls include value of ${key}`);
         return next(err);
        }
    }
    //checking if like exsists
    const like = likes.find((like)=>like.uid==uid && like.rid==rid);
    if(!like){
        return next();
    }
    likes.splice(likes.indexOf(like),1);
    // Count the number of likes for the specific rid
    const likeCounts = likes.filter(recipe => recipe.rid ===like.rid );

    res.status(200).json({ likes: likeCounts.length });

};





export const likeCounts = (req,res,next)=>{
    const id = parseInt(req.body.id);
    // Count the number of likes for the specific rid
    const likeCounts = likes.filter(recipe => recipe.rid ===id );

    //checking if id exsits
    if(!likeCounts){
        return next();
    }

    res.status(200).json({ likes: likeCounts.length });
   
};







export const isLiked = (req,res,next)=>{
    const {uid,rid}=req.body;

     //checking missing values
     for (const [key, val] of Object.entries(req.body)){
        if(!val){
         const err = new Error(`pls include value of ${key}`);
         return next(err);
        }
    }

    
     //checking if like exsists
     const like = likes.find((like)=>like.uid==uid && like.rid==rid);
     
     if(!like){
       return next();
     }
     res.status(200).json({isLiked:'true'});
};