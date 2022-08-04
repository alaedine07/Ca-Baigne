const Sequelize= require('sequelize');
const db = require('../util/database');

const Beach = db.define('beach', {
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
  }
})

module.exports = Beach;
