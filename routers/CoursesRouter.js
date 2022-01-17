const express = require("express");
const { createCourses , addCoursesList , addLesson , getCourses } =  require("../controllers/CoursesController");
const { checkCourse , checkCourseList , checkLesson } =  require("../middelwares/courses.js");

const router = express.Router()

router.post("/", checkCourse , createCourses);
router.post("/addCourseList", checkCourseList , addCoursesList);
router.post("/addLesson" , checkLesson , addLesson);
router.post("/getCouser", getCourses);


module.exports = router;