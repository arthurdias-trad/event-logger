const express = require("express");
const path = require("path");
const colors = require("colors");
const db = require(path.join(__dirname, "config", "db"));
const errorHandler = require(path.join(__dirname, "middleware", "error"));

const app = express();

const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Connect to db
db();

// Get router files
const events = require(path.join(__dirname, "routes", "events"));

// Set up router files
app.use("/events", events);

// Set up error handling middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
