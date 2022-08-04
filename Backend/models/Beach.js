const Sequelize= require('sequelize');
const db = require('../util/database');
const Post = require('../models/Post');
const User = require('../models/User');

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
  }
})
Beach.hasMany(Post)

module.exports = Beach;
