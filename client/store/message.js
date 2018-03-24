import socket from '../socket'

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'
const RESET_NEW_MESSAGE_COUNT = 'RESET_NEW_MESSAGE_COUNT'

// ACTION CREATORS
export const postMessage = (message) => ({ type: POST_MESSAGE, message })
export const fetchMessages = () => ({ type: GET_MESSAGES })
export const clearNewMessageCount = () => ({type: RESET_NEW_MESSAGE_COUNT})

// THUNK CREATORS
export const addMessage = (message) => dispatch => {
  dispatch(postMessage(message))
  socket.emit('new-message', message)
}

export const getMessages = () => dispatch => {
  dispatch(fetchMessages())
}

export const resetMessageCount = () => dispatch => { dispatch(clearNewMessageCount()) }

export default function reducer (state = {allMessages: [], id: '', count: 0}, action) {
  switch (action.type) {
    case POST_MESSAGE:
      return {...state, allMessages: [...state.allMessages, action.message]}

    case GET_MESSAGES:
      return {...state}

    case RESET_NEW_MESSAGE_COUNT:
      return {...state, count: 0}
    default:
      return state
  }
}
