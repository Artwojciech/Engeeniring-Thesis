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
  const { categoryId } = req.params;
  const { title } = req.query;

  try {
    const photos = await photoService.getPhotosByCategory(categoryId, title);
    res.status(200).json(photos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, category } = req.body;
    const photo = await photoService.createPhoto({
      title,
      filename: req.file.filename,
      category
    });

    res.status(201).json(photo);
  } catch (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'file is too large' });
    }
    if (error.message.includes('Invalid file type')) {
      return res.status(415).json({ message: error.message });
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
  addPhoto,
  editPhoto,
  deletePhoto
};
