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
        res.send(`Welcome ${user.userName}`)
      }
      return res.send('Email or password are incorrect');
    } catch {
      res.status(500).send()
    }
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
    console.log({accessToken: accessToken})
}
