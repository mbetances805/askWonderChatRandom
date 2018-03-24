const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser')
const client = redis.createClient() // creates a new client

module.exports = {app, client}

if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(cookieParser('secretSign#143_!223'))
  // compression middleware
  app.use(compression())

  app.use(session({
    secret: 'some-private-key',
    // key: 'test',
    // proxy: 'true',
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      client: client,
      ttl: 260
    }),
    saveUninitialized: false,
    resave: false
      // secret: 'memcached-secret-key' // Optionally use transparent encryption for redisstore session data
  }))

  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

// start listening (and create a server object representing our server)
const startListening = () => {
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  const io = socketio(server)
  require('./socket')(io)
}

const connectRedis = () => {
  client.on('connect', function () {
    console.log('redis connected')
  })

  client.on('error', error => {
    console.log(`Error: ${error}`)
  })
}

// client.set('foo', 'hi', redis.print)
// client.get('foo', function (error, reply) {
//   if (error) throw error
//   console.log(reply.toString())
// })

// if (redis.call('get', KEYS[1] == ARGV[1]) {
//   return redis.call('get', KEYS[1])
// }
// if (require.main === module) {
//   session.sync()
//     .then(createApp)
//     .then(startListening)
//     .then(connectRedis)
// } else {
createApp()
startListening()
connectRedis()
// }
