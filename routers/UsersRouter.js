const express = require("express");
const passport = require("passport");
const {
  logIn,
  Register,
} = require("../controllers/UsersControllers.js");
const { checkRegister } = require("../middelwares/users");
const router = express.Router();


const CLIENT_URL = "http://localhost:3000";
// Router
//Router login facbook
router.get("/auth/facebook",passport.authenticate("facebook", { authType: "reauthenticate" }));
router.get("/auth/facebook/callback",passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${CLIENT_URL}/user`);
});




//Router login local
router.post("/logIn", logIn);
router.post("/register", checkRegister, Register);
router.get("/login/success", (req, res) => {
  // console.log(req._passport.session.user);
  // if (req.user) {
  //   res.status(200).json({
  //     success: true,
  //     message: "successfull",
  //     user: req.user,
  //     //   cookies: req.cookies
  //   });
  // }
  // res.status(500).json({
  //   message:"Server Error",
  //   status: "500"
  // })
  console.log(req);
  // return res.json(req)
});


module.exports = router;
