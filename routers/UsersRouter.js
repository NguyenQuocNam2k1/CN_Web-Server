const express = require("express");
const { logIn, Register , RegisterFirebase } = require("../controllers/UsersControllers.js");
const { checkRegister , checkRegisterFB } = require("../middlewares/users");
const router = express.Router();


//Router login local
router.post("/login", logIn);
router.post("/loginFirebase",checkRegisterFB  , RegisterFirebase);
router.post("/register", checkRegister, Register);

module.exports = router;
