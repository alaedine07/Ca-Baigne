const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email }})
    if (user === null) {
      return res.status(400).send('Email or password are incorrect');
    }
    try {
      if (await bcrypt.compare(req.body.hashedPassword, user.hashedPassword)) {
        new_user = {id: user.id, Username: user.userName}
        const token = jwt.sign(new_user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).send(
          {
          message: 'Logged in successfully',
          token
          })
        console.log({accessToken: token})
      }
    } catch {
      res.status(500).send('Email or password are incorrect')
    }
  }
