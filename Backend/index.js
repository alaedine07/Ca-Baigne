const express = require('express');
const userRoute = require('./routes/userRoute');
const beachRoute = require('./routes/beachRoute')
const postRoute = require('./routes/postRoute')
const app = express();

// database
const db = require('./util/database');

//Routes for different endpoints 
app.use('/users', userRoute);
app.use('/beaches', beachRoute);
app.use('/posts', postRoute)

// connect backend to the database
db.authenticate ()
  .then(() => console.log('**Database connected**'))
  .catch(err => console.log('Error: ' + err))

// loads environment variables from a .env file into the process.env object
require('dotenv').config()

// add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

// synchronize Sequelize model with database tables.
// test connection to server
try {
    db.sync().then(() => {
        app.listen(process.env.EXTERNAL_PORT || 3001);
        console.log(`*server running on port ${process.env.EXTERNAL_PORT}*`);
    });
} catch (error) {
    console.error(error);
}
