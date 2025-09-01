const { Op } = require('sequelize');
const Favourite = require('../models/favourite');
const Photo = require('../models/photo');
const Category = require('../models/category');

const getFavourites = async (userId, sort = 'asc', from = null, to = null, page = 1, limit = 20) => {
  const where = { user_id: userId };

  if (from || to) {
    where.added_at = {};
    if(from){
        const fromDate = new Date(from);
        if(!isNaN(fromDate)) {                    //rozbijam to na zmienne i sprawdzam czy nie jest nan zeby nie mozna bylo
            where.added_at[Op.gte] = fromDate;      //wyslac np from=8, z tego co wyczytalem Date() z tego byloby nan
        }
    } 
    if(to){
        const toDate = new Date(to);
        if (!isNaN(toDate)) {
            where.added_at[Op.lte] = toDate;
        }
    } 
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Favourite.findAll({
    where,
    limit,
    offset,
    order: [['added_at', sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC']],
    include: [
      {
        model: Photo,
        as: 'photo',
        include: [{ model: Category, as: 'category' }]
      }
    ]
  });

  return {
    photos: rows.map(fav => fav.photo),
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  };
};

const addFavourite = async (userId, photoId) => {
  return await Favourite.create({
    user_id: userId,
    photo_id: photoId
  });
};

const deleteFavourite = async (userId, photoId) => {
  const deleted = await Favourite.destroy({
    where: { user_id: userId, photo_id: photoId }
  });

  if (!deleted) {
    throw new Error('favourite wasnt found');
  }
};

module.exports = {
  getFavourites,
  addFavourite,
  deleteFavourite
};
