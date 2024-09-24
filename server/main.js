const express = require("express");
const app = express();
const port = 9772; // port address
const router = require("./routes/api");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/project_mern")
  .then(() => {
    console.log("successful DataBase Connected");
  })
  .catch((error) => {
    console.log(error); 
    });

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log("Server is Connected");

  // Green colored message for server status
  setInterval(() => {
    console.log("\x1b[32m%s\x1b[0m", "server is fine");
  }, 1000000);
});
