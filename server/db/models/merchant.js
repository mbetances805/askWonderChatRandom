const Sequelize = require('sequelize')
const db = require('../db')

const Merchant = db.define('merchant', {
  merchantName: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  merchantAddress: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  merchantPhoneNumber: {
    type: Sequelize.TEXT(),
    allowNull: false
  },
  merchantStatus: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false
  }
})

module.exports = Merchant
