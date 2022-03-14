const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

// @desc    Get item
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const query = req.query;

  const sortBy =
    query.price === 'asc'
      ? { price: 1 }
      : query.price === 'desc'
      ? { price: -1 }
      : {};

  let items = await Item.find({}).sort(sortBy);

  items = items.filter((products) => {
    let isValid = true;
    for (key in query) {
      isValid = Array.isArray(query.category)
        ? query[key].includes(products[key])
        : [query[key]].includes(products[key]);
    }
    return isValid;
  });

  res.status(200).json(items);
});

// @desc    Set item
// @route   POST /api/items
// @access  Private
const setItem = asyncHandler(async (req, res) => {
  if (
    !req.body.brand ||
    !req.body.category ||
    !req.body.type ||
    !req.body.title ||
    !req.body.description ||
    !req.body.price
  ) {
    res.status(400);
    throw new Error('Please fill out the required fields');
  }
  if (!req.user.isAdmin) throw new Error('User is not authorized to do this');

  const item = await Item.create({
    brand: req.body.brand,
    category: req.body.category,
    type: req.body.type,
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

const getUploadedImages = (req, res) => {
  try {
    const path = require('path');
    const fs = require('fs');

    const dirPath = path.join(__dirname, '../images');
    const data = req.body;

    let buffer = [];
    data.map((item) => {
      const newItem = item.replace(/^data:image\/\w+;base64,/, '');
      buffer.push(new Buffer.from(newItem, 'base64'));
    });

    (async () => {
      buffer.forEach((item, i) => {
        fs.writeFile(
          path.join(dirPath + `/${Date.now() + i}.png`),
          item,
          function (err) {
            if (err) return console.error(err);
          }
        );
      });

      console.log('GetImages from backend function Fired Up');
    })();
  } catch (err) {
    console.error(err);
  }
  res.status(200).json('arg');
};

module.exports = {
  getItems,
  setItem,
  getOneItem,
  updateItem,
  deleteItem,
  getUploadedImages,
};
