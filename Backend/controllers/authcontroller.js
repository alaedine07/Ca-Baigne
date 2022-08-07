const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    console.log('login controller');
    console.log(req.body);
    const user = await User.findOne({ where: { userName: req.body.userName }})
    if (user === null) {
      return res.status(400).send('Username or password are incorrect');
    }
    try {
      if (await bcrypt.compare(req.body.hashedPassword, user.hashedPassword)) {
        res.send(`Welcome ${user.userName}`)
      }
      return res.send('Username or password are incorrect');
    } catch {
      res.status(500).send()
    }
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
    console.log({accessToken: accessToken})
}

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) console.log(err)
      req.user = user
      console.log(req.user)
      next()
    })
}
