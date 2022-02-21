const express = require("express");
const passport = require("passport");
const { logIn, Register } = require("../controllers/UsersControllers.js");
const { checkRegister } = require("../middlewares/users");
const router = express.Router();


//Router login local
router.post("/login", logIn);
router.post("/register", checkRegister, Register);

router.get("/auth/facebook", passport.authenticate("facebook", { authType: "reauthenticate" }));
router.get("/auth/facebook/callback",passport.authenticate('facebook', { assignProperty: 'federatedUser', failureRedirect: '/login' }),
  (req , res , next) => {
      console.log(req.user);
      console.log("Success");
  }
);


module.exports = router;
