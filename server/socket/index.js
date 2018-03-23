module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // socket.on('new-message', (message) => {
    //   // need to finish populating
    //   socket.broadcast.to().emit('new-message', message)
    //   console.log('broadcast done')
    // })
  })

  // socket.on('enter-room', (user, room) => {
  //
  // })
}
