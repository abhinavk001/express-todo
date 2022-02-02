require("./models/db.js");
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");

const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController");

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));

app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/views")));

app.get("/", (req, res) => {
  res.render("task/home");
});
app.use("/task", taskController);
app.use("/auth", authController);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
