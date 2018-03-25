import socket from '../socket'

// ACTION TYPES
const POST_MESSAGE = 'POST_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'
const RESET_NEW_MESSAGE_COUNT = 'RESET_NEW_MESSAGE_COUNT'

// ACTION CREATORS
export const displayMessage = (message) => ({ type: POST_MESSAGE, message })
export const fetchMessages = () => ({ type: GET_MESSAGES })
export const clearNewMessageCount = () => ({type: RESET_NEW_MESSAGE_COUNT})

// THUNK CREATORS
export const showMessage = (messageDetails) => dispatch => {
  let {message} = messageDetails

  let delayExp = /\/delay/g
  let hop = /\/hop/g
  let command = message.match(delayExp) || message.match(hop)

  if (!command) {
    socket.emit('new-message', messageDetails)
    dispatch(displayMessage(messageDetails))
    console.log('messageDetails', messageDetails)
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
    messageDetails.message = messageDetails.message + 'hop'
    dispatch(displayMessage(messageDetails))
    socket.emit('new-message', messageDetails)
  }
}

export const getMessages = () => dispatch => {
  dispatch(fetchMessages())
}

export const resetMessageCount = () => dispatch => { dispatch(clearNewMessageCount()) }

export default function reducer (state = {allMessages: []}, action) {
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
