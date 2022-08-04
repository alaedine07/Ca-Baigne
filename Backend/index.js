const express = require('express');
const userRoute = require('./routes/userRoute');
const beachRoute = require('./routes/beachRoute')
const postRoute = require('./routes/postRoute')
const bodyParser = require('body-parser');
const db = require('./util/database');
const app = express();

// add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routes for different endpoints
app.use('/api/v1/user', userRoute);
app.use('/api/v1/beach', beachRoute);
app.use('/api/v1/post', postRoute)

// connect backend to the database
db.authenticate ()
  .then(() => console.log('**Database connected**'))
  .catch(err => console.log('Error: ' + err))


  // loads environment variables from a .env file into the process.env object
require('dotenv').config()

// synchronize Sequelize model with database tables.
// test connection to server
try {
    db.sync({ force: true }).then(() => {
        app.listen(process.env.EXTERNAL_PORT || 3001);
        console.log(`*server running on port ${process.env.EXTERNAL_PORT}*`);
    });
} catch (error) {
    console.error(error);
}
