const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Get router files
const events = require(path.join(__dirname, "routes", "events"));

// Set up router files
app.use("/events", events);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});