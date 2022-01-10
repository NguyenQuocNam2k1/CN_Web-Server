import express from 'express'
import { logIn , Register } from '../controllers/UsersControllers.js'

const router = express.Router()


router.post('/logIn' , logIn)
router.post('/register' , Register)



export default router