const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const existingUser = await User.findOne({ Email: Email });
    // console.log("existingUser---------", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const newUser = new User({
      Email,
      Password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ status: "success", message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    // console.log("user-----",user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
   
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    res
      .status(200)
      .json({ status: "success", message: "Login Successfult", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.check = async(req,res)=>{
    console.log(req.userId)
    console.log("yes")
}
