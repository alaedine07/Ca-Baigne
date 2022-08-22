const express = require('express');
const userRoute = require('./routes/userRoute');
const beachRoute = require('./routes/beachRoute')
const postRoute = require('./routes/postRoute')
const authRoute = require('./routes/authRoute');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Post = require('./models/Post');
const Beach = require('./models/Beach');
const db = require('./util/database');
const app = express();

// define the associations
User.hasMany(Post, {foreignKey: 'post_id', onDelete: 'CASCADE'});

Post.belongsTo(User);
Post.belongsTo(Beach);
Beach.hasMany(Post, {foreignKey: 'post_id', onDelete: 'CASCADE'});

// create a juntion table
Beach.belongsToMany(User, {through: 'favoritebeaches'});
User.belongsToMany(Beach, {through: 'favoritebeaches'});

// add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes for different endpoints
app.use('/api/v1/user', userRoute);
app.use('/api/v1/beach', beachRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/auth', authRoute);

// connect backend to the database
db.authenticate ()
  .then(() => console.log('**Database connected**'))
  .catch(err => console.log('Error: ' + err))


// loads environment variables from a .env file into the process.env object
require('dotenv').config()

// synchronize Sequelize model with database tables.
// test connection to server
try {
    // i changed the force to false to not create new empty tables everytime the app restarts
    db.sync({ force: false }).then(() => {
        app.listen(process.env.EXTERNAL_PORT || 3001);
        console.log(`*server running on port ${process.env.EXTERNAL_PORT}*`);
    });
} catch (error) {
    console.error(error);
}
