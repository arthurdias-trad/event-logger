const path = require("path");
const router = require("express").Router();
const {
  getEvents,
  addEvent,
  getEvent,
  deleteEvent,
  updateEvent,
} = require(path.join("..", "controllers", "events"));

router.route("/").get(getEvents).post(addEvent);

router.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);
module.exports = router;
