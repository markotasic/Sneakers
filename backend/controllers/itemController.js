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

const getUploadedImages = async (req, res) => {
  try {
    const path = require('path');
    const fs = require('fs');
    // const Jimp = require('jimp'); AKO HOCEMO DA SMANJIMO KVALITET SLIKA

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
    })();
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  getItems,
  setItem,
  getOneItem,
  updateItem,
  deleteItem,
  getUploadedImages,
};
