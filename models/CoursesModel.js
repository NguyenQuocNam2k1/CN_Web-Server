import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        idCourse: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        view: {
            type: String,
            required: true,
        },

    },
)