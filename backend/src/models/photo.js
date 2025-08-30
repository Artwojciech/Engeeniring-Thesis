const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Photo = db.define('Photo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  filename: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category_id: {
    type: DataTypes.UUID,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  tableName: 'photos',
  timestamps: true
});

module.exports = Photo;
