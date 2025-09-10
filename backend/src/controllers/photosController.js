const photoService = require('../services/photosService');

const getPhoto = async (req, res) => {
  try {
    const photo = await photoService.getPhotoById(req.params.id);
    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPhotosByCategory = async (req, res) => {
  try {
    const { page = 1, limit = 20, title } = req.query;
    const { categoryName } = req.params;

    const result = await photoService.getPhotosByCategory(
      categoryName,
      title,
      parseInt(page),
      parseInt(limit)
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addPhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const { title, category } = req.body;
    const photos = await Promise.all(
      req.files.map((file) =>
        photoService.createPhoto({
          title,
          filename: file.filename,
          category,
        })
      )
    );

    res.status(201).json(photos);
  } catch (error) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
};

const editPhoto = async (req, res) => {
  try {
    const updatedPhoto = await photoService.updatePhoto(req.params.id, req.body.title);
    res.status(200).json(updatedPhoto);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    await photoService.deletePhoto(id);
    res.status(200).json({ message: 'photo deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPhoto,
  getPhotosByCategory,
  addPhotos,
  editPhoto,
  deletePhoto
};
