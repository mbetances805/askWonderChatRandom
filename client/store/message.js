import socket from '../socket'
import { hopPair } from './user'

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'
const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

// ACTION CREATORS
export const displayMessage = (message) => ({ type: POST_MESSAGE, message })
export const fetchMessages = () => ({ type: GET_MESSAGES })
export const clearMessages = () => ({ type: CLEAR_MESSAGES })

// THUNK CREATORS
export const showMessage = (messageDetails) => dispatch => {
  let {message} = messageDetails

  let delayExp = /\/delay/g
  let hop = /\/hop/g
  let command = message.match(delayExp) || message.match(hop)

  if (!command) {
    socket.emit('new-message', messageDetails)
    dispatch(displayMessage(messageDetails))
  } else if (command[0] === '/delay') {
    let messageSub = message.substr(message.indexOf(' ') + 1)
    let duration = messageSub.substr(0, messageSub.indexOf(' ') + 1)
    let messageString = messageSub.substr(messageSub.indexOf(' ') + 1)

    setTimeout(() => {
      let updatedMessage = {...messageDetails}
      updatedMessage.message = messageString
      dispatch(displayMessage(updatedMessage))
      socket.emit('new-message', updatedMessage)
    }, Number(duration))
  } else if (command[0] === '/hop') {
    dispatch(hopPair(messageDetails))
  }
}

export const getMessages = () => dispatch => {
  dispatch(fetchMessages())
}

export default function reducer (state = {allMessages: []}, action) {
  switch (action.type) {
    case POST_MESSAGE:
      return {...state, allMessages: [...state.allMessages, action.message]}

    case GET_MESSAGES:
      return {...state}

    case CLEAR_MESSAGES:
      return {...state, allMessages: []}

    default:
      return state
  }
}
