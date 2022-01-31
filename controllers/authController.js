const express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
  res.send("Authentication");
});

router.post("/register", (req, res) => {
  res.send("register");
});

module.exports = router;
