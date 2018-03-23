const Sequelize = require('sequelize')
const db = require('../db')

const EventManagerCreationStatus = db.define('eventManagerCreationStatus', {
  eventManagerCreationStatus: {
    type: Sequelize.ENUM('Pending', 'Created'),
    allowNull: false,
    defaultValue: 'Pending'
  }
})

module.exports = EventManagerCreationStatus
