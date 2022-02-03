const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const user = mongoose.model("User");

var router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  res.json(req.body);
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

function addUser(req, res, hashedPassword) {
  var User = new user();
  User.email = req.body.email;
  User.username = req.body.username;
  User.password = hashedPassword;
  console.log("before");
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
    res.redirect("/auth/login");
  } catch (err) {
    res.redirect("/auth/signup");
  }
});

module.exports = router;
