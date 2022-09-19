const Sequelize = require('sequelize');
const db = require('../util/database');

const FaceookUser = db.define('facebookuser', {
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
  imageURL: {
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
})


// User.belongsTo(Beach, {foreignKey: 'favorites', type: Sequelize.ENUM})

module.exports = FaceookUser;
