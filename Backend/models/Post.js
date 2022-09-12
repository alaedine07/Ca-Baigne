const Sequelize = require('sequelize');
const db = require('../util/database');
const path = require('path');

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
  userName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userImageatPh: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Post;
