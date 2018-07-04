import socket from '../socket'

const CREATE_USER = 'CREATE_USER'
const GET_SOCKET_ID = 'GET_SOCKET_ID'
const GET_ROOM_ID = 'GET_ROOM_ID'
const GET_PAIRING = 'GET_PAIRING'
const UPDATE_PAIRING = 'UPDATE_PAIRING'
const HOP_PAIRING = 'HOP_PAIRING'

export const createUser = user => ({ type: CREATE_USER, user })
export const getSocketId = (id) => ({type: GET_SOCKET_ID, id})
export const getRoomId = (id) => ({type: GET_ROOM_ID, id})
export const getPairing = (status) => ({ type: GET_PAIRING, status })
export const updatePairing = (socketId, status) => ({ type: UPDATE_PAIRING, socketId, status })
export const hopPairing = (socketId, status) => ({ type: HOP_PAIRING, socketId, status })

export const postUser = (userName) =>
  dispatch => {
    dispatch(createUser(userName))
    let socketInfo = socket.emit('join-room', userName, false, '')
    dispatch(getSocketId(socketInfo.id))
  }

export const checkPairing = (room) =>
  dispatch => {
    socket.emit('check-pairing', room, false)
  }

export const hopPair = (messageDetails) => dispatch => {
  let {user} = messageDetails
  socket.emit('hop-pairing', user.userName, user.room,
    user.socketId, user.pairing)
}

export default function (state = {userName: '', socketId: '', pairing: false, room: ''}, action) {
  switch (action.type) {
    case CREATE_USER:
      return {...state, userName: action.user}

    case GET_SOCKET_ID:
      return {...state, socketId: action.id}

    case GET_ROOM_ID:
      return {...state, room: action.id}

    case GET_PAIRING:
      return {...state, pairing: action.status}

    case HOP_PAIRING:
    case UPDATE_PAIRING:
      return {...state, pairing: action.status}

    default:
      return state
  }
}
