const express = require('express');
const router = require('./routes/routes');
const app = express();

// database
const db = require('./util/database');

// connect backend to the database
db.authenticate ()
  .then(() => console.log('**Database connected**'))
  .catch(err => console.log('Error: ' + err))

// config from dotenv
require('dotenv').config()

// add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

app.use('/routes', router);

// synchronize Sequelize model with database tables.
// test connection to server
try {
    db.sync().then(() => {
        app.listen(process.env.EXTERNAL_PORT);
        console.log(`*server running on port ${process.env.EXTERNAL_PORT}*`);
    });
} catch (error) {
    console.error(error);
}
