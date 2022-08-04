const Beach = require('../models/Beach');

exports.BeachTest = (req, res, next) =>
{
    return res.status(200).json("Hello from beaches route");
}

exports.GetAllBeaches = (req, res, next) =>
{
  Beach.findAll()
  .then(data => {
    console.log(data);
    // change this line later to return data as Json to the front end
    res.status(200).json("data retrieved");
  })
  .catch(err => console.log(err));
}

exports.AddNewBeach = (req, res, next) =>
{
  const {name, governorate, latitude, longitude} = req.body
  const beach = { name, governorate, latitude, longitude }
  Beach.create(beach)
  .then(data => console.log('beach created'))
  .catch(console.log('Some error occured'))
}

exports.DeleteNewBeach = (req, res) => {
  const { id } = req.body
  Beach.destroy({ where: { id }})
  .then( console.log('Beach has been deleted !') )
  .catch( err => console.log(err) )
}
