const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

// @desc    Get item
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  console.log('sort', req.body);
  const items = await Item.find({}).sort({
    price: 1,
  });

  res.status(200).json(items);
});

// @desc    Set item
// @route   POST /api/items
// @access  Private
const setItem = asyncHandler(async (req, res) => {
  // console.log(req.body);

  // const user = await User.findOne({ email });
  // console.log(user);

  // if (
  //   !req.body.manufacturer ||
  //   !req.body.title ||
  //   !req.body.description ||
  //   !req.body.price
  // ) {
  //   res.status(400);
  //   throw new Error('Please fill out the required fields');
  // }
  // console.log(req.user);

  // if (!req.user.isAdmin) throw new Error('User is not authorized to do this');

  const item = await Item.create({
    manufacturer: req.body.manufacturer,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });

  res.status(200).json(item);
});

// @desc    Get item
// @route   GET /api/items/:id
// @access  Public
const getOneItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  res.status(200).json(item);
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error('User is not an admin');
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json(updatedItem);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error('User is not an admin');
  }

  await item.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getItems,
  setItem,
  getOneItem,
  updateItem,
  deleteItem,
};
