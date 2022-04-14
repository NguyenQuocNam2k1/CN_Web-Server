const express = require("express");
const { logIn, Register , RegisterFirebase, addNewCourse , updateCourse } = require("../controllers/UsersControllers.js");
const { checkRegister , checkRegisterFB  } = require("../middlewares/users");
const router = express.Router();


//Router login local
router.post("/login", logIn);
router.post("/loginFirebase",checkRegisterFB  , RegisterFirebase);
router.post("/register", checkRegister, Register);
router.post("/addCourse", addNewCourse);
router.post("/updateCourseStudying", updateCourse);
module.exports = router;
