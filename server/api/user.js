const router = require('express').Router()
const redis = require('redis')
const client = require('../index')

// const {User} = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   User.findAll({
//     attributes: ['id', 'email']
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })

router.post('/:userName', (req, res, next) => {
  const { userName } = req.params
  client.set(userName, 'hi', redis.print)
  client.get(userName, function (error, reply) {
    if (error) throw error
    console.log(reply.toString())
  })
})
