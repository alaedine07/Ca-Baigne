const Post = require('../models/Post')

exports.Post = ('/', async (req, res) =>
  await Post.findAll()
  .then(post => {
     console.log(post)
     res.sendStatus(200)
  }
     )
  .catch(err => console.error(err))
)
