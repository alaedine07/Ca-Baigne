const Beach = require('../models/Beach');

exports.getAllBeaches = (req, res, next) =>
{
  Beach.findAll()
  .then(beaches => {
    res.status(200).json({ beaches });
  })
  .catch(err => res.status(404).json('Error: ' + err));
}

exports.getBeach = (req, res) => {
  const { id } = req.params
  Beach.findOne({ where: { id } })
  .then(
    beach => res.status(200).json({ beach })
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.addNewBeach = (req, res, next) =>
{
  items = req.body.caracteristiques.split(',');
  output = {}
  for (var i = 0; i < items.length; i++) {
    output[i] = items[i];
  }
  const {name, governorate, latitude, longitude} = req.body;
  const imagepath = req.file.path;
  const amenities = output;
  const beach = { name, governorate, latitude, longitude, imagepath, amenities}
  Beach.create(beach)
  .then(
    newBeach => res.status(200).json({ newBeach })
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.updateBeach = (req, res) => {
  const { id } = req.params
  const {name, governorate, latitude, longitude} = req.body
  const beach = { name, governorate, latitude, longitude }
  Beach.update({ ...beach},
    { where: {id} })
  .then(
    res.status(200).json(`Beach with id: ${id} has been updated !`)
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.deleteBeach = (req, res) => {
  const { id } = req.params
  Beach.destroy({ where: { id }})
  .then(
    res.status(200).json(`Beach with id: ${id} has been deleted !`)
  )
  .catch( err => res.status(404).json('Error: ' + err) )
}
