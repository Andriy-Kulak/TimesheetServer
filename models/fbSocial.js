const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fbSchema = new Schema({
  fbHandle: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
});

module.exports = mongoose.model('FbData', fbSchema);
