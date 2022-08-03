const Sequelize= require('sequelize');
const db = require('../util/database');

const Post = db.define('post', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  beach_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Post;
