const Post = require('../models/Post')

exports.TestPostsRoutes = (req, res, next) =>
{
    return res.status(200).json("Hello from Posts route");
}
