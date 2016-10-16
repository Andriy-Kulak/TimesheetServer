const mongoose = require('mongoose');

let TimesheetSchema = new mongoose.Schema({
  dateWorked: Date,
  hoursWorked: Number,
  workType: String,
  userInfo: {
    email: String,
    firstName: String,
    lastName: String,
    iat: String,
    sub: String
  }
});

//   date_submitted: Date.now
module.exports = mongoose.model('Timesheet', TimesheetSchema);