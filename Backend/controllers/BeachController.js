const Beach = require('../models/Beach')

exports.Beach = ('/', async (req, res) =>
  await Beach.findAll()
  .then(beach => {
     console.log(beach)
     res.sendStatus(200)
  }
     )
  .catch(err => console.error(err))
)
