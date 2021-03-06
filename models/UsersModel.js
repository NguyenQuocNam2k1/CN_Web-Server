const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password_hash: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    image:{
      type:String,
      required: true
    },
    course_studied:{
      type: Array,
      required:true
    },
    lesson_course:{
      type: Array,
      require: true
    }
  },
  { timestamps: true, collection: "users" }
);


exports.UserModel = mongoose.model("users", userSchema);



