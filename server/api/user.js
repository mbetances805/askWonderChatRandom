const router = require('express').Router()
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
  console.log('router.post', userName)
  client.set(userName, 'hi', function (error, reply) {
    if (error) throw error
    console.log(reply.toString())
  })
})
