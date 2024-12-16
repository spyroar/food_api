const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgon = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
// Database connections
connectDB()
// middelewares
app.use(cors());
app.use(express.json());
app.use(morgon("dev"));
app.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));

app.listen(PORT, () =>
  console.log(`Port listening on ${PORT}!`.white.bgMagenta)
);
