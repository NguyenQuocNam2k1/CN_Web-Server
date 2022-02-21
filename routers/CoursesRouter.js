const express = require("express");
const {
  createCourses,
  addCoursesList,
  addLesson,
  getCourses,
  getAllCourseList,
  getAllLesson,
  getLessonByCourse,
  countUserView,
  getCoursesByRouter,
} = require("../controllers/CoursesController");
const {
  checkCourse,
  checkCourseList,
  checkLesson,
} = require("../middlewares/courses.js");

const router = express.Router();

//Add course
router.post("/", checkCourse, createCourses);
router.post("/addCourseList", checkCourseList, addCoursesList);
router.post("/addLesson", checkLesson, addLesson);
router.post("/getCouser", getCourses);

// Get course
router.get("/courseLists", getAllCourseList);
router.get("/allLesson", getAllLesson);
router.post("/lessonByIdCourse", getLessonByCourse);
router.post("/courseByRoute", getCoursesByRouter);

//Update db
router.post("/count-view", countUserView);

module.exports = router;
