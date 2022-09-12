const Sequelize= require('sequelize');
const db = require('../util/database');

const Favorites = db.define('favorite', {
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    beach_id: {
        type: Sequelize.UUID,
        allowNull: false,
    }
})

module.exports = Favorites;