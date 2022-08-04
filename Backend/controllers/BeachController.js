const Beach = require('../models/Beach')

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
  // console.log('post request');
  // console.log(req.body.name);
  const beach = {
    name: req.body.name,
    governorate: req.body.governorate,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  }
  Beach.create(beach)
  .then(data => console.log('beach created'))
  .catch(console.log('Some error occured'))
}