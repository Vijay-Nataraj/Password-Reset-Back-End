const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://vjn-password-reset.netlify.app",
    credentials: true,
  })
);

app.use("/", authRouter);

module.exports = app;
