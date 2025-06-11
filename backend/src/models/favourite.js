const { DataTypes } = require('sequelize');
const db = require('../util/db');

const Favourite = db.define('Favourite', {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  photo_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: 'photos',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  added_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'favourites',
  timestamps: false
});

module.exports = Favourite;
