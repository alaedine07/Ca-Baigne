const Beach = require('../models/Beach');

exports.getAllBeaches = (req, res, next) =>
{
  Beach.findAll()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => res.status(404).json('Error: ' + err));
}

exports.getBeach = (req, res) => {
  const { id } = req.params
  Beach.findOne({ where: { id } })
  .then(
    beach => res.status(200).json({beach})
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.addNewBeach = async (req, res, next) =>
{
  const {name, governorate, latitude, longitude} = req.body
  const beach = { name, governorate, latitude, longitude }
  Beach.create(beach)
  .then(
    beach => res.status(200).json({beach})
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
