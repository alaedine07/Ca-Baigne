const Post = require('../models/Post')

exports.Post = ('/', async (req, res) =>
  await Post.findAll()
  .then(
   res.status(200).send('Posts Api')
     )
  .catch(err => console.error(err))
)
