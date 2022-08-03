const User = require('../models/User')

exports.User = ('/', async (req, res) =>
  await User.findAll()
  .then(
   res.status(200).send('Users Api')
     )
  .catch(err => console.error(err))
)
