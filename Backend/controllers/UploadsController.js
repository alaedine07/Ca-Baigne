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
