const regSchema = require("../models/Reg");
const adminProduct = require("../models/adminField");



exports.homepagecontroler = (req, res) => {
  res.send("This is the home page using backend");
};

exports.vishupagecontroler = (req, res) => {
  res.send("Hello, my name is Vishur Shukla");
};

// Registration Controller
exports.regidatacontroler = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, userEmail, userPass } = req.body;

    // Check if user already exists
    const userExists = await regSchema.findOne({ userEmail });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Create new user record
    const record = new regSchema({
      firstName,
      lastName,
      userEmail,
      userPass,
    });

    await record.save();

    res.json({ message: "Successful registration..." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed. Please try again later." });
  }
};

exports.LoginDataControler = async (req, res) => {
  try {
    const { userId, pass } = req.body;

    // Find user by email
    let userCheck = await regSchema.findOne({ userEmail: userId });

    if (!userCheck) {
      return res.status(400).json({ message: "Email not found." });
    }

    // Check if the passwords match
    if (userCheck.userPass !== pass) {
      return res.status(400).json({ message: "Incorrect password." });
    }


    // If login is successful
    res.json({ data:userCheck,message: "Successfully logged in." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};


exports.eproductControler = async (req, res)=>{
      const record = await adminProduct.find()
          res.json({data:record})
}