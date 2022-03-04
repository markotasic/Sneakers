import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items/';

//Create new item
const createItem = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, itemData, config);

  return response.data;
};

//Get user items
const getItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getOneItem = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + itemId, config);

  return response.data;
};

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
  deleteItem,
};

export default itemService;
