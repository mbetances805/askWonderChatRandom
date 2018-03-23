const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Product.create({
    productCategory: req.body.productCategory,
    productName: req.body.productName,
    productHeadline: req.body.productHeadline,
    productDescription: req.body.productDescription,
    productFinePrint: req.body.productFinePrint,
    productLocation: req.body.productAddress,
    productStatus: req.body.productStatus,
    productStartDate: req.body.productStartDate,
    productEndDate: req.body.productEndDate,
    merchantId: req.body.merchantId
  })
    .then(product => {
      req.body.eventManagers.forEach(eventManager => {
        product.addEventManager(eventManager.id, {through: {eventManagerCreationStatus: 'Pending'}})
      })
      return product
    })
    .then(product => res.json(product))
    .catch(next)
})

// area for improvement is to add eager loading to this section
router.get('/pending', (req, res, next) => {
  Product.findAll({
    where: {
      productStatus: 'Active'
    },
    include: [{all: true}]
  })
  .then(products => res.json(products))
  .catch(err => console.log(err))
})
