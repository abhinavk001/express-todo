const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },
  taskDesc: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

mongoose.model("Task", taskSchema);
