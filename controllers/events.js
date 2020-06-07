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

// @desc    Get a single event
// @route   GET /events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(400).json({ success: false, msg: "Event not found" });
    }

    return res.status(200).json({
      success: true,
      event,
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

// @desc    Delete an event
// @route   DELETE /events/:id
// @access  Public
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(400).json({ success: false, msg: "Event not found" });
    }
    await Event.deleteOne(event);

    return res.status(204).json({});
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

// @desc    Update an event
// @route   PUT /events/:id
// @access  Public
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(400).json({ success: false, msg: "Event not found" });
    }

    if (Date(req.body.startDate) !== event.startDate && !req.body.endDate) {
      req.body.endDate = req.body.startDate;
    }

    event = await Event.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });

    return res.status(200).json({ success: true, event });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};
