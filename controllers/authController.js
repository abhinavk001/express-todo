const express = require("express");

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

router.post("/signup", (req, res) => {
  res.json(req.body);
});

module.exports = router;
