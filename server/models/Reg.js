const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const regSchema = new Schema({
  firstName: String,
  lastName: String,
  userEmail: { type: String, unique: true }, // Ensure emails are unique
  userPass: String  // Changed 'userpass' to 'userPass' for consistency
});

module.exports = model("Reg", regSchema);
