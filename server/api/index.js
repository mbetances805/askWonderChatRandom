const router = require('express').Router()
module.exports = router

router.use('/user', require('./user'))
// router.use('/user', require('../index'))
router.use('/products', require('./products'))
router.use('/managers', require('./eventManager'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
