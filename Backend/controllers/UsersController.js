const User = require('../models/User')

exports.TestUserRoutes = (req, res, next) =>
{
    return res.status(200).json("Hello from users route");
}
