const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the event name"],
    trim: true,
  },
  client: {
    type: String,
    trim: true,
  },
  field: {
    type: String,
    required: [true, "Please add the field of the event"],
    trim: true,
  },
  subfield: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, "Enter the start date of the event"],
  },
  endDate: {
    type: Date,
  },
  comments: {
    type: String,
    trim: true,
  },
});

EventSchema.set("collection", "events");

EventSchema.index({ name: 1, startDate: 1 }, { unique: true });

EventSchema.pre("save", function (next) {
  if (!this.endDate || this.endDate < this.startDate) {
    this.endDate = this.startDate;
  }
  next();
});

module.exports = mongoose.model("Event", EventSchema);
