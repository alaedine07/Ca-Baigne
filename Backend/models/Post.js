const Sequelize = require('sequelize');
const db = require('../util/database');
const User = require('../models/User')

const Post = db.define('post', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
})

module.exports = Post;
