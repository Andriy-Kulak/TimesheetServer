const mongoose = require('mongoose');

let TimesheetSchema = new mongoose.Schema({
  dateWorked: Date,
  hoursWorked: Number,
  workType: String,
  userInfo: Object
});

//   date_submitted: Date.now
module.exports = mongoose.model('Timesheet', TimesheetSchema);