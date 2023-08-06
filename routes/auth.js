const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).send("Invalid credential");
    }
    const token = jwt.sign({ userId: user._id, username }, "shahreen");

    res.json({ token });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// registerr

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(401).json({ message: "please fill the fields" });
    }
    const newUser = new User({ username, password });
    const userCreated = await newUser.save();
    return res
      .status(200)
      .json({ message: "user has been created", userdata: userCreated });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
