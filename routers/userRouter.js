import  express, { Router } from 'express';
import { signup,signIn, getUser, token, signOut } from '../controllers/usersControllers.js';
import authToken from '../middleware/authToken.js';
import passport  from '../utility/passport.js';



const router = express.Router();
router.post('/signup',signup);
router.post('/signin',signIn);
router.post('/signout',signOut)
router.post('/token',token);
router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { session: false }),
    (req, res) => {
        return res.status(200).json(req.user);
    });
    
router.get('/',authToken,getUser);
export default router;