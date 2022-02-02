const express = require("express");
const mongoose = require("mongoose");
const task = mongoose.model("Task");

var router = express.Router();

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
router.post("/create", (req, res) => {
  addTask(req, res);
});

function addTask(req, res) {
  var Task = new task();
  Task.taskName = req.body.taskName;
  Task.taskDesc = req.body.taskDesc;
  Task.save((err, docs) => {
    if (!err) {
      res.redirect("all");
    } else {
      console.log("Error in adding task: " + err);
    }
  });
}

//Display all tasks
router.get("/all", (req, res) => {
  task.find((err, docs) => {
    if (!err) {
      res.render("task/all", {
        list: docs.map((docs) => docs.toJSON()),
      });
    }
  });
});

//Delete a task
router.get("/delete/:id", (req, res) => {
  task.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/task/all");
    } else {
      console.log("Error in deleting task: " + err);
    }
  });
});

//Update task
router.get("/edit/:id", (req, res) => {
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
