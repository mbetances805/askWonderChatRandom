module.exports = (io) => {
  let roomId = 1
  let counter = 0
  let userSocketList = {}
  let partners = {}
  let pendingUsers = []

  const findPair = (roomId, socketId) => {
    for (let key in userSocketList) {
      if (userSocketList[key] === roomId && key !== socketId) {
        return key
      }
    }
  }

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
        partners[roomId] = new Set()
        partners[roomId].add(socket.id)
      } else {
        partners[roomId].add(socket.id)
      }

      let numUsers = partners[roomId].size

      if (numUsers !== 2) {
        socket.emit('join-room', userName, false)
      } else {
        socket.emit('join-room', userName, true)
      }
    })

    socket.on('check-pairing', (socketId, status) => {
      let roomId = userSocketList[socketId]
      let partnerSocketId = findPair(roomId, socketId)
      let numUsers = partners[roomId].size

      if (numUsers === 2) {
        socket.broadcast.to(partnerSocketId).emit('check-pairing', partnerSocketId, true)
        socket.emit('check-pairing', socketId, true)
      }
    })

    socket.on('hop-pairing', (userName, socketId, status) => {
      let userRoom = userSocketList[socketId]
      let partnerSocketId = findPair(userRoom, socketId)

      pendingUsers.push(socketId)
      pendingUsers.push(partnerSocketId)
      socket.broadcast.to(partnerSocketId).emit('hop-pairing', partnerSocketId, false)
      socket.emit('hop-pairing', socketId, false)
    })

    socket.on('new-message', (messageDetails) => {
      console.log('room', Number(userSocketList[messageDetails.user.socketId]), 'has a new-message', messageDetails)
      socket.broadcast.to(Number(userSocketList[messageDetails.user.socketId])).emit('new-message', messageDetails)
      console.log('broadcast done')
    })
  })
}
