const express = require("express");
const {
  createCourses,
  addCoursesList,
  addLesson,
  getCourseById,
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
router.post("/addLesson" , checkLesson, addLesson);

// Get course
router.get("/courseLists", getAllCourseList);
router.post("/courseByRoute", getCoursesByRouter);
router.post("/getCouser", getCourseById);

router.post("/lessonByIdCourse", getLessonByCourse);
router.get("/allLesson", getAllLesson);


//Update db
router.post("/count-view", countUserView);

module.exports = router;
