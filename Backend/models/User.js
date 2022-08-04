const Sequelize = require('sequelize');
const db = require('../util/database');

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true },
    allowNull: false
  },
  hashedPassword: {
    type: Sequelize.STRING(64),
    validate: {
      is: /^[0-9a-f]{64}$/i
    }
  },
  favorites: {
    type: Sequelize.JSON,
    allowNull: true
  }
})

module.exports = User;