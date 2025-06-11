const User = require('./users');
const Category = require('./categories');
const Photo = require('./photos');
const Favourite = require('./favourites');


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
  foreignKey: 'category_id'
});

module.exports = {
  User,
  Category,
  Photo,
  Favourite
};
