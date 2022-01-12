const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, collection: "users" }
);

exports.UserModel = mongoose.model("users", userSchema);
