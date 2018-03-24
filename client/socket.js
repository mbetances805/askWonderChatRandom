import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-message', message => {
  console.log('Incoming message:', message)
})

socket.on('disconnect', () => {
  console.log('server did disconnect.')
})

export default socket
