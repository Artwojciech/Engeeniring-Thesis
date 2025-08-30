const Photo = require('../models/photo');
const Category = require('../models/category');
const { Op } = require('sequelize');

const getPhotoById = async (id) => {
  const photo = await Photo.findByPk(id);
  if (!photo) throw new Error('photo not found');
  return photo;
};

const getPhotosByCategory = async (categoryName, title, page = 1, limit = 20) => {
  const category = await Category.findOne({ where: { name: categoryName } });
  if (!category) throw new Error('Category not found');

  const photoFilter = { category_id: category.id };
  if (title) photoFilter.title = { [Op.iLike]: `%${title}%` };

  const offset = (page - 1) * limit;

  const { count, rows } = await Photo.findAndCountAll({
    where: photoFilter,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  return {
    photos: rows,
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};

const createPhoto = async ({ title, filename, category }) => {
  const photoCat = await Category.findOne({ where: { name: category } });
  if (!photoCat) throw new Error('Category not found');

  const photo = await Photo.create({
    title,
    filename: `uploads/${category}/${filename}`,
    category_id: photoCat.id
  });

  return photo;
};

const updatePhoto = async (id, title) => {
  const photo = await Photo.findByPk(id);
  if (!photo) throw new Error('Photo not found');

  photo.title = title;
  await photo.save();
  return photo;
};

const deletePhoto = async (id) => {
  const photo = await Photo.findByPk(id);
  if (!photo) throw new Error('Photo not found');

  const category = await Category.findByPk(photo.category_id);
  if (!category) throw new Error('photo s category not found');

  const filePath = path.join(__dirname, '..', '..', 'uploads', category.name, photo.filename);

  if (fs.existsSync(filePath)) { 
    fs.unlinkSync(filePath);
  }

  await photo.destroy();
};

module.exports = {
  getPhotoById,
  getPhotosByCategory,
  createPhoto,
  updatePhoto,
  deletePhoto
};
