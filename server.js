const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./routers/UsersRouter.js");
const course = require("./routers/CoursesRouter.js");
var passport = require("passport");
const bodyParser = require("body-parser");
const passportSetup = require("./config/passport");
// var session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://admin:admin123@cluster0.xvdds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors());

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// Middelware
// require("./config/passport.js")(passport);
app.use(cookieParser());
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));/*
/*app.use(
  session({
    secret: "cnweb",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
); */
app.use(passport.initialize());
app.use(passport.session());



// Router
app.use("/api/user", users);
app.use("/api/course", course);
app.get("/", (req, res, next) => {
  res.json("Success");
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
