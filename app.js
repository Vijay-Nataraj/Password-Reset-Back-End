const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res) => {
  res.json({ message: "db connection + server listening done!" });
});

module.exports = app;
