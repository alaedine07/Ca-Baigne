const Post = require('../models/Post')

exports.TestPostsRoutes = (req, res, next) =>
{
    return res.status(200).json("Hello from Posts route");
}

exports.AddNewPost = (req, res, next) =>
{
  const { content } = req.body
  const post = { content }
  Post.create(post)
  .then(data => console.log('post created'))
  .catch(console.log('Some error occured'))
}

exports.DeletePost = (req, res) => {
  const { id } = req.body
  Post.destroy({ where: { id }})
  .then( console.log('Post has been deleted !') )
  .catch( err => console.log(err) )
}
