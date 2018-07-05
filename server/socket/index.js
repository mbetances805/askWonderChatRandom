module.exports = (io) => {
  let roomId = 1
  let counter = 0
  let userSocketList = {}
  let usersQueue = []

  // update userSocketList and partners with socketIds and roomId
  const trackUsersRoom = (roomId, socketId) => {
    if (!userSocketList[roomId]) {
      let partners = new Set()
      userSocketList[roomId] = { partnerList: partners }
    }
    userSocketList[roomId].partnerList.add(socketId)
  }

  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-room', (userName, room) => {
      if (counter === 2) {
        counter = 0
        roomId++
      }

      if (counter < 2) {
        socket.join(roomId)
        counter++
      }

      trackUsersRoom(roomId, socket.id)
      let partners = userSocketList[roomId].partnerList
      let numUsers = partners.size

      socket.emit('join-room', userName, roomId)

      // check if there are any users in the usersQueue to assign as a partner
      if (numUsers === 1 && usersQueue.length) {
        let newPartner = usersQueue.shift()
        io.sockets.connected[newPartner].join(roomId)
        socket.broadcast.to(newPartner).emit('join-room', newPartner, roomId)
        counter++
        trackUsersRoom(roomId, newPartner)
      }
      console.log('join-room userSocketList', userSocketList)
    })

    // check if user is paired, if so update pairing state to true
    socket.on('check-pairing', (roomId, status) => {
      let partners = Array.from(userSocketList[roomId].partnerList)
      let partnerSocketId = roomId === partners[0] ? partners[1] : partners[0]
      let numUsers = partners.length

      if (numUsers === 2) {
        socket.broadcast.to(partnerSocketId).emit('check-pairing', partnerSocketId, true)
        socket.emit('check-pairing', roomId, true)
      }
    })

    // when user types /hop, then update pairing state to false and push users
    // to the usersQueue for future pairing as new users join chat rooms
    socket.on('hop-pairing', (userName, userRoom, socketId, status) => {
      let partners = Array.from(userSocketList[userRoom].partnerList)
      if (userRoom) {
        let partnerSocketId = socketId === partners[0] ? partners[1] : partners[0]

        usersQueue.push(socketId)
        usersQueue.push(partnerSocketId)

        socket.broadcast.to(partnerSocketId).emit('hop-pairing', partnerSocketId, false)
        socket.emit('hop-pairing', socketId, false)

        // leave the socket room
        io.sockets.connected[socketId].leave(userRoom)
        io.sockets.connected[partnerSocketId].leave(userRoom)
        delete userSocketList[userRoom]
      }
      console.log('hop-pairing userSocketList', userSocketList)
    })

    // post a new message to the appropriate socket room
    socket.on('new-message', (messageDetails) => {
      console.log('room', messageDetails.user.room,
        'has a new-message', messageDetails)
      socket.broadcast.to(Number(messageDetails.user.room)).emit('new-message', messageDetails)
      console.log('broadcast done')
    })

    // on disconnect reassign the user left. Not DRY (very similar to hop-pairing).
    // Temporary Solution.
    socket.on('disconnect', () => {
      let partners = userSocketList[socket.roomId]
      if (partners) {
        console.log('partnersTESTING:', partners)
        let userRoom = socket.roomId
        if (userRoom) {
          let partnerSocketId = socket.id === partners[0] ? partners[1] : partners[0]

          usersQueue.push(partnerSocketId)
          socket.broadcast.to(partnerSocketId).emit('hop-pairing', partnerSocketId, false)

          // leave the socket room
          io.sockets.connected[partnerSocketId].leave(userRoom)

          delete userSocketList[socket.roomId]
        } else {
          usersQueue.pop()
        }
      }
      console.log('disconnect userSocketList', userSocketList)
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
