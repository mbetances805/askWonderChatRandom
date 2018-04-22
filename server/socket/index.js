module.exports = (io) => {
  let roomId = 1
  let counter = 0
  let userSocketList = {}
  let partners = {}
  let usersQueue = []

  // find the paired user in socket room
  const findPair = (roomId, socketId) => {
    for (let key in userSocketList) {
      if (userSocketList[key] === roomId && key !== socketId) {
        return key
      }
    }
  }

  // update userSocketList and partners with socketIds and roomId
  const trackUsersRoom = (roomId, socketId) => {
    if (!userSocketList[socketId]) {
      userSocketList[socketId] = roomId
    }

    if (!partners[roomId]) {
      partners[roomId] = new Set()
      partners[roomId].add(socketId)
    } else {
      partners[roomId].add(socketId)
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

      trackUsersRoom(roomId, socket.id)

      let numUsers = partners[roomId].size

      if (numUsers !== 2) {
        socket.emit('join-room', userName, false)
      } else {
        socket.emit('join-room', userName, true)
      }
      console.log('join-room usersQueue', usersQueue)
      // check if there are any users in the usersQueue to assign as a partner
      if (numUsers === 1 && usersQueue.length) {
        let newPartner = usersQueue.shift()
        io.sockets.connected[newPartner].join(roomId)
        counter++
        trackUsersRoom(roomId, newPartner)
      }
      console.log('join-room userSocketList', userSocketList)
    })

    // check if user is paired, if so update pairing state to true
    socket.on('check-pairing', (socketId, status) => {
      let roomId = userSocketList[socketId]
      let partnerSocketId = findPair(roomId, socketId)
      let numUsers = partners[roomId].size

      if (numUsers === 2) {
        socket.broadcast.to(partnerSocketId).emit('check-pairing', partnerSocketId, true)
        socket.emit('check-pairing', socketId, true)
      }
    })

    // when user types /hop, then update pairing state to false and push users
    // to the usersQueue for future pairing as new users join chat rooms
    socket.on('hop-pairing', (userName, socketId, status) => {
      let userRoom = userSocketList[socketId]
      if (userRoom) {
        console.log('hop-pairing userRoom', userRoom)
        let partnerSocketId = findPair(userRoom, socketId)
        console.log('hop-pairing partnerSocketId', partnerSocketId)
        console.log('hop-pairing userName', userName)

        usersQueue.push(socketId)
        usersQueue.push(partnerSocketId)

        console.log('hop-pairing usersQueue', usersQueue)
        socket.broadcast.to(partnerSocketId).emit('hop-pairing', partnerSocketId, false)
        socket.emit('hop-pairing', socketId, false)

        // leave the socket room
        io.sockets.connected[socketId].leave(userRoom)
        io.sockets.connected[partnerSocketId].leave(userRoom)
        delete userSocketList[socketId]
        delete userSocketList[partnerSocketId]
        delete partners[userRoom.toString()]
      }
      console.log('hop-pairing userSocketList', userSocketList)
    })

    // post a new message to the appropriate socket room
    socket.on('new-message', (messageDetails) => {
      console.log('room', Number(userSocketList[messageDetails.user.socketId]),
        'has a new-message', messageDetails)
      socket.broadcast.to(Number(userSocketList[messageDetails.user.socketId]))
        .emit('new-message', messageDetails)
      console.log('broadcast done')
    })

    // on disconnect reassign the user left. Not DRY (very similar to hop-pairing).
    // Temporary Solution.
    socket.on('disconnect', () => {
      let socketId = socket.id
      let userRoom = userSocketList[socketId]
      if (userRoom) {
        let partnerSocketId = findPair(userRoom, socketId)

        usersQueue.push(partnerSocketId)
        socket.broadcast.to(partnerSocketId).emit('hop-pairing', partnerSocketId, false)
        // socket.emit('disconnect', socketId, false)

        // leave the socket room
        io.sockets.connected[partnerSocketId].leave(userRoom)

        delete userSocketList[socketId]
        delete userSocketList[partnerSocketId]
        delete partners[userRoom.toString()]
      } else {
        usersQueue.pop()
      }
      console.log('disconnect userSocketList', userSocketList)
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
