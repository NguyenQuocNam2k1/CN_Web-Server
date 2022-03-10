const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./routers/UsersRouter.js");
const course = require("./routers/CoursesRouter.js");
const comment = require("./routers/CommentRouter.js");
const cookieParser = require("cookie-parser");
const http = require("http");
const { application } = require("express");

dotenv.config();
var app = express();
var server = http.createServer(app);
app.use(cors());
require("./config/socketIO.js")(server);

const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://admin:admin123@cluster0.xvdds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: false, limit: "30mb" }));
app.use(cookieParser());



// Router
app.use("/api/user", users);
app.use("/api/course", course);
app.use("/api/comment", comment);


mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });



