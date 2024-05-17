const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  stringValue: {
    type: String,
    required: true
  },
  intValue: {
    type: Number,
    required: true
  }
}, { collection: 'records' });

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
