const express = require("express");
const { createCourses , getCourses , addCourserDetail } =  require("../controllers/CoursesController");

const router = express.Router()

router.post("/" , createCourses);
router.post("/addCourseDetail" , addCourserDetail)
router.post("/getCouser", getCourses);


module.exports = router;