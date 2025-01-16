const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const authController = {
  register: async (req, res) => {
    try {
      console.log(req.body);

      // get the user input
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      // create a new user object
      const newUser = new User({ username, email, password: hashedPassword });

      //save the user
      await newUser.save();

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      console.log(req.body);

      // get the email, password from the req.body
      const { email, password } = req.body;

      // check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      //compare if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        res.status(400).json({ error: "Invalid credentials" });
      }

      //generate token
      const token = await jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "3h",
      });

      //   console.log(token);

      //send the token to the http only cookie
      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = crypto.randomBytes(32).toString("hex");

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex"); // Hash the token
      user.resetPasswordToken = hashedToken;

      user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

      await user.save();

      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/reset-password/${token}`;

      await sendEmail({
        to: email,
        subject: `Password Reset Request`,
        text: `Click on the link to reset your password: ${resetUrl}`,
      });

      return res
        .status(200)
        .json({ message: "Password reset link sent successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex"); // Hash the token

      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Password reset token is invalid or has expired" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ message: "Password has been updated" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = authController;
