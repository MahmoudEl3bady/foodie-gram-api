import  express from 'express';
import { signup,signIn, getUser, token, signOut } from '../controllers/usersControllers.js';
import authToken from '../middleware/authToken.js';


const router = express.Router();
router.post('/signup',signup);
router.post('/signin',signIn);
router.post('/signout',signOut)
router.post('/token',token);
router.get('/',authToken,getUser);
export default router;