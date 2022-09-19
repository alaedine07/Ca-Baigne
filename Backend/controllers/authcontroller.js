const User = require('../models/User');
const FaceookUser = require('../models/FacebookUser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    
    const user = await User.findOne({ where: { email: req.body.email }})
    if (user === null) {
      return res.status(400).send('Email or password are incorrect');
    }
    try {
      if (await bcrypt.compare(req.body.hashedPassword, user.hashedPassword)) {
        new_user = {id: user.id, Username: user.userName, imagePath: user.imagePath, is_admin: user.isAdmin}
        const token = jwt.sign(new_user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).send(
          {
          message: 'Logged in successfully',
          token
          })
      }
    } catch {
      res.status(500).send('Email or password are incorrect')
    }
  }

exports.facebookRegistration = async (req, res) => {
  const {userName, email, imageURL} = req.body;
  const new_user = { userName, email, imageURL};
  console.log(new_user);
  FaceookUser.create(new_user)
      .then(new_user => res.status(201).json({ new_user }))
      .catch( err => res.status(500).json({err}) )

}

exports.facebookLogin = async (req, res) => {
  const user = await FaceookUser.findOne({ where: { email: req.body.email }})
  if (user === null) {
    return res.status(400).send('your facebook account is not registred');
  }
  try {
    new_user = {id: user.id, Username: user.userName, imagePath: user.imageURL}
    const token = jwt.sign(new_user, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).send(
      {
      message: 'Logged in successfully',
      token
    })
  } catch {
    res.status(500).send('Something went wrong');
  }
}
