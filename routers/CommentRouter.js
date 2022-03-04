const express = require("express");
const {getComment} = require("../controllers/CommentController.js")
const router = express.Router();


//Router login local
router.get("/" , getComment);


module.exports = router;
