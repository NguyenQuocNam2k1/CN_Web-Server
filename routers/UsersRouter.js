const express = require("express");
const passport = require("passport");
const {logIn, logInFB, Register} = require("../controllers/UsersControllers.js");
const { checkRegister } = require("../middelwares/users");
const router = express.Router();



// Router
//Router login facbook
router.get("/auth/facebook", passport.authenticate("facebook", { authType: "reauthenticate" }));

router.get("/auth/facebook/callback", logInFB);
router.get("/", (req, res, next) => {
  res.json(req.user);
});

//Router login local
router.post("/logIn", logIn);
router.post("/register", checkRegister, Register);

module.exports = router;
