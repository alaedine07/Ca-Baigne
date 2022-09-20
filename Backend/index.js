const express = require('express');
const userRoute = require('./routes/userRoute');
const beachRoute = require('./routes/beachRoute');
const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');
const uploadRoute = require('./routes/uploads');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Post = require('./models/Post');
const Beach = require('./models/Beach');
const logger = require('morgan');
const db = require('./util/database');
const app = express();

// user can have many posts and each post belong to one user
User.hasMany(Post, {as: 'comments', onDelete: 'CASCADE'});
Post.belongsTo(User, {foreignKey: "userId", as: "user"});

// beach can have many posts and each post belong to one beach
Beach.hasMany(Post, {as: 'comments', onDelete: 'CASCADE'});
Post.belongsTo(Beach, {foreignKey: "beachId", as: "beach"});

// create a junction table
// Beach.belongsToMany(User, {through: 'favoritebeaches'});
// User.belongsToMany(Beach, {through: 'favoritebeaches'});

// add middlewares
app.use(express.static(__dirname));
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
app.use(logger('dev'));


// endoint routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/beach', beachRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/uploads', uploadRoute);

app.get('/', (req, res) => {
    res.send('hello app is working');
})

// connect backend to the database
db.authenticate ()
  .then(() => console.log('**Database connected**'))
  .catch(err => console.log('Error: ' + err))


// loads environment variables from a .env file into the process.env object
require('dotenv').config()



// synchronize Sequelize model with database tables and run the server
try {
    // Change false to true if you modified the models it will re-create the tables
    // NB: it will delete all previous entries
    db.sync({ force: false }).then(() => {
        const server = app.listen(process.env.EXTERNAL_PORT || 3001);
    });
} catch (error) {
    console.error(error);
}

module.exports = app
