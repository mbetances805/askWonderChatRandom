// const client = require('../index')

module.exports = (io) => {
  // let x = []
  let roomId = 1
  let counter = 0
  let userSocketList = {}
  let partners = {}
  let pendingUsers = []

  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-room', (userName, status) => {
      if (counter === 2) {
        counter = 0
        roomId++
      }

      if (counter <= 2) {
        socket.join(roomId)
        counter++
      }

      if (!userSocketList[socket.id]) {
        userSocketList[socket.id] = roomId
      }

      if (!partners[roomId]) {
        partners[roomId] = [userName]
      } else {
        partners[roomId].push(userName)
      }

      let numUsers = partners[roomId].length

      if (numUsers !== 2) {
        socket.emit('join-room', userName, false)
      } else {
        socket.emit('join-room', userName, true)
      }

      console.log('userSocketList', userSocketList)
      console.log('partners', partners)
    })

    socket.on('check-pairing', (socketId, status) => {
      let roomId = userSocketList[socketId]
      let partnerSocketId = null
      for (let key in userSocketList) {
        if (userSocketList[key] === roomId && key !== socketId) {
          partnerSocketId = key
        }
      }
      let numUsers = partners[roomId].length

      if (numUsers === 2) {
        console.log(`check-pairing, updating ${partnerSocketId}'s pairing status to true'`)
        socket.broadcast.to(partnerSocketId).emit('check-pairing', partnerSocketId, true)
        socket.emit('check-pairing', socketId, true)
      }
    })

    socket.on('new-message', (messageDetails) => {
      console.log('room', Number(userSocketList[messageDetails.user.socketId]), 'has a new-message', messageDetails)
      socket.broadcast.to(Number(userSocketList[messageDetails.user.socketId])).emit('new-message', messageDetails)
      console.log('broadcast done')
    })

    socket.on('leave-room', (userName) => {
      // for (let keys in userSocketList) {
      //
      // }
      console.log(`leaving room ${socket.id}`)
      socket.leave()
    })
    // socket.on('new-message', (message) => {
    //   console.log('room', `${socket.id}`, 'has a new-message', message)
    //   // socket.emit('new-message', message)
    //   // socket.broadcast.to(message.whiteboardId).emit('new-message', message);
    //   console.log('broadcast done')
    // })
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
    // roomId++
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
