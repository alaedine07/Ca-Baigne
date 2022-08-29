const Sequelize= require('sequelize');
const db = require('../util/database');

const Beach = db.define('beach', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  governorate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  amenities: {
    type: Sequelize.JSON,
    allowNull: true
  },
  imagepath: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Beach;
