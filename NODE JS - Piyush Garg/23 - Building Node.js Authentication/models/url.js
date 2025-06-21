const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  redirectURL: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  visitHistory: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserShortURL',
    required: true,
  },

});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;