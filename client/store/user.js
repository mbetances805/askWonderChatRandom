import socket from '../socket'

const CREATE_USER = 'CREATE_USER'
const GET_SOCKET_ID = 'GET_SOCKET_ID'
const GET_PAIRING = 'GET_PAIRING'
const UPDATE_PAIRING = 'UPDATE_PAIRING'
const HOP_PAIRING = 'HOP_PAIRING'

export const createUser = user => ({ type: CREATE_USER, user })
export const getSocketId = (id) => ({type: GET_SOCKET_ID, id})
export const getPairing = (status) => ({ type: GET_PAIRING, status })
export const updatePairing = (socketId, status) => ({ type: UPDATE_PAIRING, socketId, status })
export const hopPairing = (socketId, status) => ({ type: HOP_PAIRING, socketId, status })

export const postUser = (userName) =>
  dispatch => {
    let status = false
    dispatch(createUser(userName))
    let socketInfo = socket.emit('join-room', userName, status)
    dispatch(getSocketId(socketInfo.id))
    socket.emit('check-pairing', socketInfo.id, status)
  }

export const hopPair = (messageDetails) => dispatch => {
  socket.emit('hop-pairing', messageDetails.user.userName,
    messageDetails.user.socketId, messageDetails.user.pairing)
}

export default function (state = {userName: '', socketId: '', pairing: false}, action) {
  switch (action.type) {
    case CREATE_USER:
      return {...state, userName: action.user}

    case GET_SOCKET_ID:
      return {...state, socketId: action.id}

    case GET_PAIRING:
      return {...state, pairing: action.status}

    case HOP_PAIRING:
    case UPDATE_PAIRING:
      return {...state, pairing: action.status}

    default:
      return state
  }
}
