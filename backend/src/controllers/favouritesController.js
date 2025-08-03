const favouritesService = require('../services/favouritesService');

const getFavourites = async (req, res) => {
  try {
    const userId = req.user.id;
    const {sort='asc', from=null, to=null} = req.query;

    const favourites = await favouritesService.getFavourites(userId, sort, from, to);
    res.json(favourites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { photoId } = req.params;

    const fav = await favouritesService.addFavourite(userId, photoId);
    res.status(201).json(fav);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { photoId } = req.params;

    await favouritesService.deleteFavourite(userId, photoId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getFavourites,
  addFavourite,
  deleteFavourite
};
