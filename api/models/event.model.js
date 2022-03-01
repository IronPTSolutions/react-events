const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: 'Event title is required',
    minlength: [3, 'Event title needs at least 3 chars']
  },
  image: {
    type: String,
    required: 'Event image url is required'
  },
  eventDt: {
    type: Date,
    required: 'Event date time is required'
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;