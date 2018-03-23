const User = require('./user')
const Product = require('./product')
const EventManager = require('./eventManager')
const Merchant = require('./merchant')
const EventManagerCreationStatus = require('./eventManagerCreationStatus')

Product.belongsTo(Merchant)
Product.belongsToMany(EventManager, {through: EventManagerCreationStatus})
EventManager.belongsToMany(Product, {through: EventManagerCreationStatus})
User.belongsTo(Merchant)

module.exports = {
  User,
  Product,
  EventManager,
  Merchant,
  EventManagerCreationStatus
}
