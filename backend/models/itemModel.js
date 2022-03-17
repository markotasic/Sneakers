const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    category: {
      type: String,
      required: [true, 'Please select category'],
    },
    type: {
      type: String,
      required: [true, 'Please select type'],
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
    imagePaths: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
