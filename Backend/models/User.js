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
  },
  imagePath: {
    type: Sequelize.STRING,
<<<<<<< HEAD
    allowNull: true
=======
    allowNull: true,
    defaultValue: ''
>>>>>>> 23ddd0168db327500271bb0edac8c6f15b8783aa
  }
})


// User.belongsTo(Beach, {foreignKey: 'favorites', type: Sequelize.ENUM})

module.exports = User;
