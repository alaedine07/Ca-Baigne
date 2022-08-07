const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getAllUsers = (req, res, next) =>
{
  User.findAll()
  .then(users => {
    res.status(200).json({ users });
  })
  .catch(err => res.status(404).json('Error: ' + err));
}

exports.getUser = async (req, res) => {
  res.json(await User.findOne({ where: { id: req.user.id } }))
}

exports.addNewUser = async (req, res) =>
{
  const { userName, email, hashedPassword } = req.body
  const newUser = await User.findOne({ where: { email: req.body.email } })
  if (newUser) return res.status(409).send('User Already exists ')
  else {
    const hashedPwd = await bcrypt.hash(hashedPassword, 10)
  const user = { userName, email, hashedPassword: hashedPwd }
  User.create(user)
  .then(newUser => res.status(201).json({ newUser }))
  .catch( err => res.status(500).json({err}) )
  }
}

exports.login = async (req, res) => {
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

exports.authenticateToken = (req, res, next) => {
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

exports.updateUser = (req, res) => {
  const { id } = req.params
  const { userName, email, hashedPassword} = req.body
  const user = { userName, email, hashedPassword }
  User.update({ ...user },
    { where: {id} })
  .then(
    res.status(200).json(`User with id: ${id} has been updated !`)
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.deleteUser = (req, res) => {
  const { id } = req.params
  User.destroy({ where: { id }})
  .then(
    res.status(200).json(`User with id: ${id} has been deleted !`)
  )
  .catch( err => console.log(err) )
}
