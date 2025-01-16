require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  EMAIL_USER,
  EMAIL_PASS,
};
