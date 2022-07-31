const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres'
    }
)

module.exports = sequelize