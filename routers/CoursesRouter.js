const express = require("express");
const { createCourses } =  require("../controllers/CoursesController");

const router = express.Router()

router.post("/" , createCourses);


module.exports = router;