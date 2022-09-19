const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.uploadUserImage = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    const imagePath = req.file.path;
    decoded.imagePath = imagePath;
    const new_token = jwt.sign(decoded, process.env.ACCESS_TOKEN_SECRET);
    const user = { imagePath }
    const id = req.body.userid;
    User.update({ ...user },
        { where: {id} })
      .then(
        res.status(200).send({token: new_token}).json('Image has been successfully updated')
      ).catch(err => res.status(404).json('Error: ' + err))
}

// upload user image azure url to database
exports.azureblobuploaduser = (req, res, next) => {
  const filename = req.body.filename;
  // create url to be added to user imagePath field
  const imagePath = "https://cabaignestorage.blob.core.windows.net/images/" + filename
  const token = req.headers['authorization'].split(" ")[1];
  const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  decoded.imagePath = imagePath;
  // create a new token to update the imagePath field of the current user
  const new_token = jwt.sign(decoded, process.env.ACCESS_TOKEN_SECRET);
  const user = { imagePath }
  const id = decoded.id
  // update the imagePath field corresponding to the user in the database
  User.update({ ...user },{ where: {id}}).then(
    res.status(200).send({token: new_token}).json('Image has been successfully updated')
  ).catch(err => res.status(500).json('error' + err));
}