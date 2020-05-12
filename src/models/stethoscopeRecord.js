const mongoose = require('mongoose');

const stethoscopeRecordSchema = new mongoose.Schema({
  audioUrl: String,
  numberOfBreaths: Number,
  hasHeartBeats: Boolean,
}, { versionKey: false });

module.exports = mongoose.model('stethoscopeRecord', stethoscopeRecordSchema);
