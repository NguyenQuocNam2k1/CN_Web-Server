const mongoose = require("mongoose");


const coursesSchema = new mongoose.Schema(
    {
        idCourses: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    },
    { timestamps: true, collection: "courses" }
)
exports.coursesModel = mongoose.model("courses" , coursesSchema)




const coursesListSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
            ref: "courses"
        },
        idCoursesList:{
            type: String,
            required: true
        },
        countUser: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        }
    },
    { timestamps: true, collection: "list-courses" }
)
exports.coursesListModel = mongoose.model("list-courses" , coursesListSchema)




const lessonSchema = new mongoose.Schema(
    {
        listCourse: {
            type: String,
            required: true,
            ref: "list-courses"
        },
        name: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "lesson" }
)
exports.lessonModel = mongoose.model("lesson" , lessonSchema)