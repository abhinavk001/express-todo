if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const passport = require("passport");
const task = mongoose.model("Task");
const user = mongoose.model("User");
const session = require("express-session");

const initializePassport = require("../passport-config");
initializePassport(passport, user);

var router = express.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

// -----------------Authentication Routers-----------------

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/task/all",
    failureRedirect: "/task/login?error=true",
  })
);

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

function addUser(req, res, hashedPassword) {
  var User = new user();
  User.email = req.body.email;
  User.username = req.body.username;
  User.password = hashedPassword;
  User.save((err, docs) => {
    if (!err) {
      console.log("User added successfully.");
    } else {
      console.log("Error in adding user: " + err);
    }
  });
}

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    addUser(req, res, hashedPassword);
    res.redirect("/task/login");
  } catch (err) {
    res.redirect("/task/signup");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

let isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/task/login");
};

//----------------Task Routers-----------------

//Add task form
router.get("/create", (req, res) => {
  res.render("task/addEdit", {
    viewTitle: "Add Task",
    taskName: "",
    taskDesc: "",
    route: "/task/create",
    method: "POST",
  });
});

//Add task to db on post request
router.post("/create", isLoggedIn, (req, res) => {
  addTask(req, res);
});

function addTask(req, res) {
  var Task = new task();
  Task.taskName = req.body.taskName;
  Task.taskDesc = req.body.taskDesc;
  Task.userId = req.user._id;
  Task.save((err, docs) => {
    if (!err) {
      res.redirect("all");
    } else {
      console.log("Error in adding task: " + err);
    }
  });
}

//Display all tasks
router.get("/all", isLoggedIn, (req, res) => {
  task.find({ userId: req.user._id }, (err, docs) => {
    if (!err) {
      res.render("task/all", {
        list: docs.map((docs) => docs.toJSON()),
      });
    }
  });
});

//Delete a task
router.get("/delete/:id", isLoggedIn, (req, res) => {
  task.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/task/all");
    } else {
      console.log("Error in deleting task: " + err);
    }
  });
});

//Update task
router.get("/edit/:id", isLoggedIn, (req, res) => {
  task
    .findById(req.params.id)
    .then((docs) => {
      if (!docs) {
        console.log("Error in retrieving task. ");
      } else {
        res.render("task/addEdit", {
          taskName: docs.taskName,
          taskDesc: docs.taskDesc,
          viewTitle: "Update Task",
          route: "/task/edit/" + req.params.id,
          method: "post",
        });
      }
    })
    .catch((err) => console.log("Error in retrieving task: " + err));
});

router.post("/edit/:id", (req, res) => {
  let updatedTask = {
    taskName: req.body.taskName,
    taskDesc: req.body.taskDesc,
  };
  task.findByIdAndUpdate(req.params.id, updatedTask, (err, docs) => {
    if (!err) {
      res.redirect("/task/all");
    } else {
      console.log("Error in updating task: " + err);
    }
  });
});

module.exports = router;
