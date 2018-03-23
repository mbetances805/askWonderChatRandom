const Sequelize = require('sequelize')
const db = require('../db')

// add more values for productCategory
// add a subcategory for events: performances, nightlife, etc.
const Product = db.define('product', {
  productCategory: {
    type: Sequelize.ENUM('Events'),
    allowNull: false
  },
  productName: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  productHeadline: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  productDescription: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  productFinePrint: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  productLocation: {
    type: Sequelize.TEXT()
  },
  productStatus: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false
  },
  productStartDate: {
    type: Sequelize.DATE
  },
  productEndDate: {
    type: Sequelize.DATE
  }
})

module.exports = Product
