const express = require("express");
const app = express();
const port = 9772;
const router = require("./routes/api");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/project_mern")
  .then(() => {
    console.log("successful DataBase Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors()); 
app.use(express.json());
app.use(express.static("./public/upload"));

app.use("/api", router);

app.listen(port, () => {
  console.log("Server is Connected");

  setInterval(() => {
    console.log("\x1b[32m%s\x1b[0m", "server is fine");
  }, 1000000);
});
