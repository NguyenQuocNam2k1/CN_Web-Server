const express = require("express");
const { logIn, Register } = require("../controllers/UsersControllers.js");
const { checkRegister } = require("../middelwares/users");
const router = express.Router();


//Router login local
router.post("/login", logIn);
router.post("/register", checkRegister, Register);

module.exports = router;
