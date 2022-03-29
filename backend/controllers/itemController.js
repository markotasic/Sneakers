const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');
const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../images');

// @desc    Set item
// @route   POST /api/items
// @access  Private

const setItem = asyncHandler(async (req, res) => {
  console.log('setItems FIRED UP!!!!!!!!!');
  const data = req.body.previewUrl;
  //___________________OUTSOURCE___________________//
  let myImagesArr = [];
  let buffer = [];
  data.map((item) => {
    const newItem = item.replace(/^data:image\/\w+;base64,/, '');
    buffer.push(new Buffer.from(newItem, 'base64'));
  });

  (async () => {
    let pathToImages = path.join(dirPath + `/${Date.now()}`);
    buffer.forEach((item, i) => {
      fs.writeFile(pathToImages + i + '.png', item, function (err) {
        if (err) return console.error(err);
      });
      myImagesArr.push(pathToImages);
    });
  })();

  let imagePaths = myImagesArr.map(
    (item, i) => item.replace(path + '\\backend\\', '') + i + '.png'
  );
  //___________________OUTSOURCE___________________//

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

  const item = await Item.create({
    brand: req.body.itemData.brand,
    category: req.body.itemData.category,
    type: req.body.itemData.type,
    title: req.body.itemData.title,
    description: req.body.itemData.description,
    price: req.body.itemData.price,
    imagePaths: imagePaths,
  });

  res.status(200).json(item);
});

// @desc    Get item
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const query = req.query;

  const limit = 16;
  const page = +query.page;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const sortBy =
    query.price === 'asc'
      ? { price: 1 }
      : query.price === 'desc'
      ? { price: -1 }
      : {};

  let filteredItems = {};
  if (query.category) filteredItems.category = query.category;
  if (query.brand) filteredItems.brand = query.brand;
  if (query.type) filteredItems.type = query.type;

  let products = {};
  products.items = await Item.find(filteredItems)
    .sort(sortBy)
    .limit(limit)
    .skip(startIndex)
    .exec();

  if (endIndex < (await Item.countDocuments().exec())) {
    products.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    products.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  products.total = Math.ceil(
    (await Item.find(filteredItems).countDocuments({})) / limit
  );

  const maxPrice = await Item.find().sort({ price: -1 }).limit(1);
  const minPrice = await Item.find()
    .sort({ price: +1 })
    .limit(1);

  products.maxPrice = maxPrice[0].price;
  products.minPrice = minPrice[0].price;

  res.status(200).json(products);
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
  //___________________OUTSOURCE___________________//
  const data = req.body.previewUrl;
  let myImagesArr = [];
  let buffer = [];
  data.map((item) => {
    const newItem = item.replace(/^data:image\/\w+;base64,/, '');
    buffer.push(new Buffer.from(newItem, 'base64'));
  });

  (async () => {
    let pathToImages = path.join(dirPath + `/${Date.now()}`);
    buffer.forEach((item, i) => {
      fs.writeFile(pathToImages + i + '.png', item, function (err) {
        if (err) return console.error(err);
      });
      myImagesArr.push(pathToImages);
    });
  })();

  let imagePaths = myImagesArr.map(
    (item, i) =>
      item.replace('E:\\MyWorkspace\\Sneakers\\backend\\', '') + i + '.png'
  );
  //___________________OUTSOURCE___________________//

  let newData = { ...req.body.itemData, imagePaths };

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

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, newData);

  res.status(200).json(updatedItem);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(400);
      throw new Error('Item not found');
    }

    //____________Delete images from the folder____________//
    const pathsForDelete = [];
    item.imagePaths.forEach((imagePath) => pathsForDelete.push(imagePath));

    pathsForDelete.forEach((path) => {
      fs.unlink(path.replace('images', dirPath), function (err) {
        if (err) return console.log(err);
      });
    });
    //____________________________________________________//

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
  } catch (err) {
    console.error(err);
  }
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
