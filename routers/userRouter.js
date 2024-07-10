import  express from 'express';
import { signup,signIn } from '../controllers/usersControllers.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signIn);

export default router;