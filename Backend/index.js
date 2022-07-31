const express = require('express');
const router = require('./routes/routes');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

app.use('/routes', router);

try {
    app.listen(process.env.EXTERNAL_PORT | 3001);
    console.log('server running on port 3001');
} catch (error) {
    console.error(error);
}