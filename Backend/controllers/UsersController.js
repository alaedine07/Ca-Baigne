const User = require('../models/User')

exports.getAllUsers = (req, res, next) =>
{
  User.findAll()
  .then(users => {
    res.status(200).json({ users });
  })
  .catch(err => res.status(404).json('Error: ' + err));
}

exports.getUser = (req, res) => {
  const { id } = req.params
  User.findOne({ where: { id } })
  .then(
    user => res.status(200).json({ user })
  )
  .catch(err => res.status(404).json('Error: ' + err))
}

exports.addNewUser = (req, res, next) =>
{
  const { userName, email, hashedPassword} = req.body
  const user = { userName, email, hashedPassword }
  User.create(user)
  .then(newUser => res.status(200).json({ newUser }))
  .catch(console.log('Some error occured'))
}

exports.updateUser = (req, res) => {
  const { id } = req.params
  const { userName, email, hashedPassword} = req.body
  const user = { userName, email, hashedPassword }
  User.update({ ...user },
    { where: {id} })
  .then(
    updatedUser => res.status(200).json(`User with id: ${id} has been updated !`)
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
