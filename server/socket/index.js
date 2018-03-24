const client = require('../index')

module.exports = (io) => {
  // let x = []
  let roomId = 1
  io.sockets.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.join(`${roomId}`)

    socket.on('new-message', function (message) {
      console.log('backend', message)
      socket.emit('new-message', message)
    })
    // if (!x.length % 2) {
    //   x.push({
    //     socketId: socket.id,
    //     username: 'b',
    //     roomId: null,
    //     paired: false
    //   })
    //   socket.emit('new-message', 'please wait for another user')
    // } else {
    //   x.push({
    //     socketId: socket.id,
    //     username: 'c',
    //     roomId: nextRoomId,
    //     paired: true
    //   })
    //   let partner = x[x.length - 2]
    //   partner.roomId = nextRoomId
    //   partner.paired = true
    //
    //   socket.emit('new-message', `great, youve been paired with ${partner.socketId}`)
    //   socket.broadcast.to(partner.socketId).emit('new-message', `thanks for waiting, youve been paired with ${socket.id}`)
    roomId++
    // }

    // console.log('x', x)

    // socket.on('create', function (roomId) {
    //   console.log('backend roomId', roomId)
    //   socket.join(socket.id)
    // })

  //   socket.on('new-message', ({roomId, message}) => {
  //     socket.broadcast.to(socket.id).emit('new-message', message)
  //     console.log(`broadcast done to ${roomId} with message: ${message}`)
  //   })
  })
}
