import express from 'express';
import { logIn , Register , checkRegister } from '../controllers/UsersControllers.js';
// import { checkRegister } from '../middelwares/register';

const router = express.Router()


router.post('/logIn'  , logIn)
router.post('/register', checkRegister , Register)



export default router;