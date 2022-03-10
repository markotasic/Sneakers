const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    manufacturer: {
      type: String,
      required: [true, 'Please add a manufacturer'],
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
