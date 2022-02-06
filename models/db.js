if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://user1:${process.env.DB_PSSWD}@taskapp.g7tme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true },
  (err) => {
    if (!err) console.log("MongoDB connection succeeded.");
    else
      console.log(
        "Error in DB connection: " + JSON.stringify(err, undefined, 2)
      );
  }
);

require("./task.model");
require("./user.model");
