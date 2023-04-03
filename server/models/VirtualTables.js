const mongoose = require('mongoose');
const { Schema } = mongoose;

const virtualTableSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  capacity: {
    type: Number,
    required: true,
  },
  seats: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      index: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const VirtualTable = mongoose.model('VirtualTable', virtualTableSchema);

module.exports = VirtualTable;