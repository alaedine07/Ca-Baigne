const Beach = require('../models/Beach')

exports.Beach = ('/', async (req, res) =>
  await Beach.findAll()
  .then(
   res.status(200).send('Beaches Api')
     )
  .catch(err => console.error(err))
)
