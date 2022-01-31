const express = require("express");
const mongoose = require("mongoose");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("task/addEdit", {
    viewTitle: "Add Task",
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
});

// function addTask(req, res) {
//   var Task = new task()
//   Task.taskName = req.body.taskName;
//   Task.taskDesc = req.body.taskDesc;

// }

module.exports = router;
