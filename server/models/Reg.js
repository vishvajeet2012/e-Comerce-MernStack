const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const regSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  userEmail: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  userPass: { type: String, required: true },
  userStatus: {
    type: String,
    enum: ["Active", "Suspended"],
    default: "Active",
  },
});

module.exports = model("Reg", regSchema);
