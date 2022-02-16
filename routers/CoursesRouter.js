const express = require("express");
const { createCourses , addCoursesList , addLesson , getCourses , getAllCourseList } =  require("../controllers/CoursesController");
const { checkCourse , checkCourseList , checkLesson } =  require("../middelwares/courses.js");

const router = express.Router()

//Add course
router.post("/", checkCourse , createCourses);
router.post("/addCourseList", checkCourseList , addCoursesList);
router.post("/addLesson" , checkLesson , addLesson);
router.post("/getCouser", getCourses);

// Get course
router.get("/courseLists", getAllCourseList)



module.exports = router;