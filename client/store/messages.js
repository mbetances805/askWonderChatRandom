import socket from '../socket'

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE'
const RESET_NEW_MESSAGE_COUNT = 'RESET_NEW_MESSAGE_COUNT'

// ACTION CREATORS
export const postMessage = (message) => ({ type: POST_MESSAGE, message, stack: new Error().stack })

export const clearNewMessageCount = () => ({type: RESET_NEW_MESSAGE_COUNT})

// THUNK CREATORS
export const addMessage = (message) => dispatch => {
  socket.emit('new-message', message)
}

export const resetMessageCount = () => dispatch => { dispatch(clearNewMessageCount()) }

export default function reducer (state = {allMessages: [], id: {}, count: 0}, action) {
  switch (action.type) {
    case POST_MESSAGE:
      return {...state, allMessages: [action.message, ...state.allMessages], count: state.count + 1}
    case RESET_NEW_MESSAGE_COUNT:
      return {...state, count: 0}
    default:
      return state
  }
}
