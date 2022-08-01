const express = require('express');
const router = require('./routes/routes');
const sequelize = require('./util/database');
const app = express();

// connect backend to the database
// sequelize.authenticate()
// .then(() => console.log('database connected'))
// .catch(err => console.log('Error: ' + err))


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

try {
    sequelize.sync().then(() => {
        app.listen(process.env.EXTERNAL_PORT);
        console.log(`server running on port ${process.env.EXTERNAL_PORT}`);
    });
} catch (error) {
    console.error(error);
}
