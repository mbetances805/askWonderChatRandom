const router = require('express').Router()
const {EventManager} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  EventManager.findAll({
    where: {
      eventManagerStatus: 'Active'
    }
  })
    .then(managers => res.json(managers))
    .catch(next)
})
