const Favorites = require('../models/Favorites');

exports.pinBeach = async (req, res) => {
    const {user_id, beach_id} = req.body
    const pinned = {user_id, beach_id}
    const pinnedBeach = await Favorites.findOne({ where: { beach_id: beach_id, user_id: user_id } })
    if (!pinnedBeach) {
      Favorites.create(pinned)
    .then(() => res.status(200).json({pinned}))
    .catch(err => res.status(500).json({err}))
    }
    else {
      res.status(500).send('Beach already pinned')
    }
}


exports.getAllPinnedBeaches = (req, res) => {
    const { id } = req.params
    Favorites.findAll({
        attributes:
        [ 'beach_id'],
        where: {
          user_id: id
        }
      })
      .then(beaches => res.status(200).json({ beaches }))
      .catch(err => res.status(404).json('Error: ' + err))
}

exports.removePinnedBeach = (req, res) => {
  const {id} = req.params
  Favorites.destroy({ where: { beach_id: id }})
  .then(
    res.status(200).json(`Beach with id: ${id} has been removed from favorites !`)
  )
  .catch( err => console.log(err) )
}
