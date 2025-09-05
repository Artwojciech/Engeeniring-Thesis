const User = require('./user');
const Category = require('./category');
const Photo = require('./photo');
const Favourite = require('./favourite');


User.belongsToMany(Photo, {
  through: Favourite,
  foreignKey: 'user_id',
  otherKey: 'photo_id'
});

Photo.belongsToMany(User, {
  through: Favourite,
  foreignKey: 'photo_id',
  otherKey: 'user_id'
});

Category.hasMany(Photo, {
  foreignKey: 'category_id'
});

Photo.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

Favourite.belongsTo(Photo, {
  foreignKey: 'photo_id',
  as: 'photo'
});

Favourite.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

module.exports = {
  User,
  Category,
  Photo,
  Favourite
};
