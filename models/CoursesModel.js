const mongoose = require("mongoose");

const courseListSchema = new mongoose.Schema(
    {
        idCourse: {
            type: String,
            required: true,
        },
        nameCourse: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        view: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "list-courses" }
)

exports.courseListModel = mongoose.model("list-courses" , courseListSchema)




// const courseDetailSchema = new mongoose.Schema(
//     {
//         idCourse: {
//             type: String,
//             required: true,
//         },
//         nameCourse: {
//             type: String,
//             required: true,
//             ref:"list-courses"
//         },
//         Description: {
//             type: String,
//             required: true,
//         },
//         View: {
//             type: String,
//             required: true,
//         },
//     },
//     { timestamps: true, collection: "list-courses-detail" }
// )

// exports.courseListModel = mongoose.model("list-courses" , courseDetailSchema)