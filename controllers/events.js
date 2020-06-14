const path = require("path");
const Event = require(path.join("..", "models", "Event"));
const ErrorResponse = require(path.join("..", "utils", "ErrorResponse"));
const AsyncHandler = require(path.join("..", "middleware", "async"));

// @desc    Get all events
// @route   GET /events
// @access  Public
exports.getEvents = AsyncHandler(async (req, res, next) => {
  const events = await Event.find({ user: req.user });

  return res.status(200).json({
    success: true,
    events,
  });
});

// @desc    Get a single event
// @route   GET /events/:id
// @access  Public
exports.getEvent = AsyncHandler(async (req, res, next) => {
  const event = await Event.findOne({ _id: req.params.id, user: req.user });

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with ID ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({
    success: true,
    event,
  });
});

// @desc    Post an event
// @route   POST /events
// @access  Public
exports.addEvent = AsyncHandler(async (req, res, next) => {
  req.body.user = req.user;

  const event = new Event(req.body);
  await event.save();

  return res.status(201).json({ success: true, event });
});

// @desc    Delete an event
// @route   DELETE /events/:id
// @access  Public
exports.deleteEvent = AsyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with ID ${req.params.id}`, 404)
    );
  }

  console.log(event.user, req.user);

  if (event.user.toString() !== req.user) {
    return next(
      new ErrorResponse("You are not authorized to delete this event", 403)
    );
  }

  await Event.deleteOne(event);

  return res.status(204).json({});
});

// @desc    Update an event
// @route   PUT /events/:id
// @access  Public
exports.updateEvent = AsyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    next(new ErrorResponse(`Event not found with ID ${req.params.id}`, 404));
  }

  if (event.user.toString() !== req.user) {
    next(new ErrorResponse("You are not authorized to edit this event", 403));
  }

  if (
    Date(req.body.startDate) !== event.startDate &&
    (!req.body.endDate || req.body.endDate < req.body.startDate)
  ) {
    req.body.endDate = req.body.startDate;
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json({ success: true, event });
});
