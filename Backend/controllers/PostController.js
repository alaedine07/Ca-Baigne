const Post = require('../models/Post')

exports.getAllPosts = (req, res, next) =>
{
  Post.findAll()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => res.status(404).json('Error: ' + err));
}

exports.getPost = (req, res) => {
  const { id } = req.params
  Post.findOne({ where: { id } })
  .then(
    beach => res.status(200).json({beach})
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.addNewPost = (req, res, next) =>
{
  const { content } = req.body
  const post = { content }
  Post.create(post)
  .then(data => console.log('post created'))
  .catch(console.log('Some error occured'))
}

exports.updatePost = (req, res) => {
  const { id } = req.params
  const { content } = req.body
  Beach.update({ content },
    { where: {id} })
  .then(
    res.status(200).json(`Post with id: ${id} has been updated !`)
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.deletePost = (req, res) => {
  const { id } = req.body
  Post.destroy({ where: { id }})
  .then( console.log('Post has been deleted !') )
  .catch( err => console.log(err) )
}
