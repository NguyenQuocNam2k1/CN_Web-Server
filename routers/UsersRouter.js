const express = require('express');
const { logIn , Register } = require('../controllers/UsersControllers.js');
const { checkRegister } = require("../middelwares/register")

const router = express.Router()


router.post('/logIn'  , logIn)
router.post('/register', checkRegister , Register)



module.exports = router;