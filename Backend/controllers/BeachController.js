const Beach = require('../models/Beach');
const User = require('../models/User');
const Post = require('../models/Post');


exports.getAllBeaches = (req, res, next) =>
{
  // remove sensitive informations
  Beach.findAll({ include: [{
    model: Post,
    as: 'comments',
    include: [
      {
      model: User,
      as: "user"
  }]
  }] })
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
  items = req.body.caracteristiques
  output = {}
  for (var i = 0; i < items.length; i++) {
    output[i] = items[i];
  }
  const {name, governorate, latitude, longitude, imagepath} = req.body;
  const amenities = output;
  const beach = { name, governorate, latitude, longitude, imagepath, amenities}
  console.log(beach)
  Beach.create(beach)
  .then(
    beach => res.status(200).json({ beach })
  )
  .catch(err => console.error(err));
}

exports.updateBeach = (req, res) => {
  const { id } = req.params
  const {name, governorate, latitude, longitude, amenities, imagepath} = req.body
  const beach = { name, governorate, latitude, longitude, amenities, imagepath}
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
