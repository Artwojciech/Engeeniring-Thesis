const categoryService = require('../services/categoriesService');

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'didnt menage to fetch categories' });
  }
};

module.exports = {
  getAllCategories,
};
