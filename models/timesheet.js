var mongoose = require('mongoose');

var TimesheetSchema = new mongoose.Schema({
  name: String,
  dateWorked: Date,
  hoursWorked: Number,
  workType: String
});

//   date_submitted: Date.now
module.exports = mongoose.model('Timesheet', TimesheetSchema);