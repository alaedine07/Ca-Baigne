const Sequelize = require('sequelize');
const db = require('../util/database');

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
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
})


// User.belongsTo(Beach, {foreignKey: 'favorites', type: Sequelize.ENUM})

module.exports = User;
