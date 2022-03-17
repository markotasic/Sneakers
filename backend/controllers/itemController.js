const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

// @desc    Get item
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const query = req.query;
  console.log(query);

  const sortBy =
    query.price === 'asc'
      ? { price: 1 }
      : query.price === 'desc'
      ? { price: -1 }
      : {};

  let items = await Item.find({}).sort(sortBy);

  if (query.category) {
    items = items.filter((item) => item.category === query.category);
  }

  res.status(200).json(items);
});

// @desc    Set item
// @route   POST /api/items
// @access  Private

//_________MORAM DA IZBRISEM FUNKCIJU 'getUploadedImages, I DA PREBACIM LOGIKU U SetItem, TAKO DA KADA SE SETUJE ITEM U MongoDB SALJEM image path do foldera gde se slika pravi, TAKODJE CU MORATI DA PROMENIM RUTU POSTO SE setItem POGADJA NA NEKI DRUGI POST A NE NA uploadImages//////////////
const setItem = asyncHandler(async (req, res) => {
  ///////////////////////////////////////////////////////////

  const path = require('path');
  const fs = require('fs');

  const dirPath = path.join(__dirname, '../images');
  const data = req.body.previewUrl;

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

  ///////////////////////////////////////////////////////////////
  console.log(req.body.itemData);
  if (
    !req.body.itemData.brand ||
    !req.body.itemData.category ||
    !req.body.itemData.type ||
    !req.body.itemData.title ||
    !req.body.itemData.description ||
    !req.body.itemData.price
  ) {
    res.status(400);
    throw new Error('Please fill out the required fields');
  }
  if (!req.user.isAdmin) throw new Error('User is not authorized to do this');
  l;

  const item = await Item.create({
    brand: req.body.itemData.brand,
    category: req.body.itemData.category,
    type: req.body.itemData.type,
    title: req.body.itemData.title,
    description: req.body.itemData.description,
    price: req.body.itemData.price,
    // images: req.body.previewUrl,
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

// const getUploadedImages = (req, res) => {

//   res.status(200).json(data);
// };

module.exports = {
  getItems,
  setItem,
  getOneItem,
  updateItem,
  deleteItem,
};
