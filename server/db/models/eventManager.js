const Sequelize = require('sequelize')
const db = require('../db')

const EventManager = db.define('eventManager', {
  eventManagerName: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  eventManagerStatus: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false
  },
  eventManagerUrl: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  eventManagerPostPath: {
    type: Sequelize.STRING(),
    allowNull: false
  }
})

module.exports = EventManager
