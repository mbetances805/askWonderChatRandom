import io from 'socket.io-client'
import store, { displayMessage, updatePairing,
  hopPairing, clearMessages } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('join-room', (userName, status) => {
  console.log('Joining new room!')
})

socket.on('check-pairing', (socketId, status) => {
  console.log('checking pairing status')
  store.dispatch(updatePairing(socketId, status))
})

socket.on('hop-pairing', (socketId, status) => {
  console.log('changing pairs and pairing status')
  store.dispatch(hopPairing(socketId, status))
  store.dispatch(clearMessages())
})

socket.on('new-message', messageDetails => {
  store.dispatch(displayMessage(messageDetails))
  console.log('after dispatch')
})

socket.on('disconnect', () => {
  console.log('server did disconnect.')
})

export default socket
