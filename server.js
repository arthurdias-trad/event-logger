const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const db = require(path.join(__dirname, "config", "db"));
const errorHandler = require(path.join(__dirname, "middleware", "error"));

const app = express();

const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Connect to db
db();

// Set up config file
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Get router files
const events = require(path.join(__dirname, "routes", "events"));
const auth = require(path.join(__dirname, "routes", "auth"));

// Set up router files
app.use("/events", events);
app.use("/auth", auth);

// Set up error handling middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
