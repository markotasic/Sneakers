import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items/';

//Create new item
//OVDE CU MORATI DA DOPREMIM imagePreview da ga posljem funkiciji koja na backendu pravi item i salje ga mongoDB
const createItem = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, itemData, config);

  return response.data;
};

//Get all items
const getItems = async (sort) => {
  const response = await axios.get(API_URL + sort);

  return response.data;
};

// Get one item
const getOneItem = async (itemId) => {
  const response = await axios.get(API_URL + itemId);

  return response.data;
};

// Update item
const updateItem = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + itemId + '/edit', config);

  return response.data;
};

// Delete item
const deleteItem = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + itemId, config);

  return response.data;
};

const itemService = {
  createItem,
  getItems,
  getOneItem,
  updateItem,
  deleteItem,
};

export default itemService;
