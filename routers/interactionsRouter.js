import express from 'express';
import { addLike,deleteLike,likeCounts,isLiked } from '../controllers/likesController.js';
import { adddisLike,deletedisLike,dislikeCounts,isdisLiked } from '../controllers/dislikesController.js';





const router = express.Router();




//////////like/////////////


//adding like 

router.post('/like/add', addLike);


//removing like

router.delete('/like/delete',deleteLike);


//get like count for post

router.get('/like',likeCounts);



//checking if user liked post 
router.get('/like/isliked',isLiked);





//////////dislike///////////////




//adding dislike 

router.post('/dislike/add',adddisLike);

//removing dislike

router.delete('/dislike/delete',deletedisLike);


//get dislike count for post

router.get('/dislike',dislikeCounts);


//checking if user disliked post 
router.get('/dislike/isdisliked',isdisLiked);


export default router;