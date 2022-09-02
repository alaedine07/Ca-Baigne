const User = require('../models/User');

exports.uploadBeachImage = (req, res, next) => {
    console.log(req.file);
}

exports.uploadBeachImage = (req, res, next) => {
    console.log(req.file);
    const imagePath = req.file.path;
    const user = { imagePath }
    const id = req.body.userid;
    User.update({ ...user },
        { where: {id} })
      .then(
        res.status(200).json('Image has been successfully updated')
      ).catch(err => res.status(404).json('Error: ' + err))
}