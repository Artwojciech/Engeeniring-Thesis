const Category = require('../models/category');

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  getAllCategories,
};