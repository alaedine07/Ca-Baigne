const Sequelize = require('sequelize').Sequelize;

// loads environment variables from a .env file into the process.env object
require('dotenv').config()

const db = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: 'postgres',
        dialect: 'postgres',
        timezone: '+01'
    },
)

module.exports = db
