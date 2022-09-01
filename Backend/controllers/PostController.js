const Post = require('../models/Post')

exports.getAllPosts = (req, res, next) =>
{
  Post.findAll()
  .then(posts => {
    res.status(200).json({ posts });
  })
  .catch(err => res.status(404).json('Error: ' + err));
}

exports.getPost = (req, res) => {
  const { id } = req.params
  Post.findOne({ where: { id } })
  .then(
    post => res.status(200).json({ post })
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.addNewPost = (req, res, next) =>
{
  const { content, beachId } = req.body
  const post = { content, beachId }
  Post.create(post)
  .then(newPost => res.status(200).json({ newPost }))
  .catch(console.log('Some error occured'))
}

exports.updatePost = (req, res) => {
  const { id } = req.params
  const { content } = req.body
  Post.update({ content },
    { where: {id} })
  .then(
    res.status(200).json(`Post with id: ${id} has been updated !`)
  )
  .catch(err => res.status(404).json('Error: ' + err))
}


exports.deletePost = (req, res) => {
  const { id } = req.params
  Post.destroy({ where: { id }})
  .then( console.log('Post has been deleted !') )
  .catch( err => console.log(err) )
}
