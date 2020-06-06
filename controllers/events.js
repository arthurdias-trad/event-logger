const path = require("path");
const Event = require(path.join("..", "models", "Event"));

// @desc    Get all events
// @route   GET /events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

// @desc    Post an event
// @route   POST /events
// @access  Public
exports.addEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    return res.status(201).json({ success: true, event });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};
