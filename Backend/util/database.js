const Sequelize = require('sequelize').Sequelize;

// loads environment variables from a .env file into the process.env object
require('dotenv').config()

var db;

if (process.env.NODE_ENV === "test") {
    db = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres',
        timezone: '+01',
        logging: true
    },
)}
else {
    db = new Sequelize(
    process.env.PROD_DATABASE_NAME,
    process.env.PROD_DATABASE_USER,
    process.env.PROD_DATABASE_PASSWORD,
    {
        host: process.env.PROD_DATABASE_HOST, //change host to 'postgres' when working with docker
        dialect: 'postgres',
        timezone: '+01',
        logging: false,
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true
            }
        }
    }
)}

module.exports = db
