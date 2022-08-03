const User = require('../models/User')

exports.User = ('/', async (req, res) =>
  await User.findAll()
  .then(user => {
     console.log(user)
     res.sendStatus(200)
  }
     )
  .catch(err => console.error(err))
)
