const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) { 
    res.redirect('/login');
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) console.log(err)
      req.user = user
      console.log('user authorized')
      next()
  })
}
}

// must be protected to be used by admins only
exports.getAllUsers = (req, res, next) =>
{
  User.findAll()
  .then(users => {
    res.status(200).json({ users });
  })
  .catch(err => res.status(404).json('Error: ' + err));
}
 
exports.getUser = async (req, res) => {
  res.json(await User.findOne({ where: { id: req.params.id } }))
}

exports.addNewUser = async (req, res) =>
{
  const { userName, email, hashedPassword } = req.body
  if (!userName || !email || !hashedPassword) {
    return res.status(500).send('Missing required values');
  }
  if (userName === "" || email === "" || hashedPassword === "") {
    return res.status(500).send('empty values are not allowed');
  }
  if (userName === undefined || email === undefined || hashedPassword === undefined) {
    return res.status(500).send('empty values are not allowed');
  }
  const newUser = await User.findOne({ where: { email: req.body.email } })
  const newUserWithName = await User.findOne({ where: { userName: req.body.userName } })
  if (newUser || newUserWithName) return res.status(409).send('User Already exists')
    else {
      const hashedPwd = await bcrypt.hash(hashedPassword, 10)
      const user = { userName, email, hashedPassword: hashedPwd }
      User.create(user)
      .then(newUser => res.status(201).json({ newUser }))
      .catch( err => res.status(500).json({err}) )
   }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const existingUser = await User.findOne({ where: { id: req.params.id } })
  const { userName, email, hashedPassword } = req.body.data
  const user = { userName, email, hashedPassword }
  // check if data is the same even if password didn't change
  if (existingUser.userName === userName && existingUser.email === email && !hashedPassword) {
    return res.status(500).send('No modifications detected');
  }
  // check if the data entered is the same in the database
  if (existingUser.userName === userName && existingUser.email === email && await bcrypt.compare(hashedPassword, existingUser.hashedPassword)) {
    return res.status(500).send('No modifications detected');
  }
  // hash the password if it changed
  if (user.hashedPassword !== undefined && user.hashedPassword !== '') {
    const hashedPwd = await bcrypt.hash(hashedPassword, 10)
    user.hashedPassword = hashedPwd
  }
  // remove undefined and empty values
  Object.keys(user).forEach(key => {
    if (user[key] === undefined || user[key] === '') {
      delete user[key]
    }
  });
  User.update({ ...user },
    { where: {id} })
  .then(
    res.status(200).json(`User with id: ${id} has been updated !`)
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

// must be protected to be used by admins only
exports.deleteUser = (req, res) => {
  const { id } = req.params
  User.destroy({ where: { id }})
  .then(
    res.status(200).json(`User with id: ${id} has been deleted !`)
  )
  .catch( err => console.log(err) )
}
