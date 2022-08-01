const Sequelize = require('sequelize').Sequelize;
// config from dotenv
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres'
    }
)

module.exports = sequelize