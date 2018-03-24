import socket from '../socket'

const CREATE_USER = 'CREATE_USER'
const GET_USER = 'GET_USER'

export const createUser = user => ({ type: CREATE_USER, user })
export const getUser = () => ({ type: GET_USER })

export const postUser = (userName) =>
  dispatch => { dispatch(createUser(userName)); socket.emit('new-user', userName) }

export const fetchUser = dispatch => {
  dispatch(getUser())
}

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_USER:
      return [...state.concat(action.user)]

    case GET_USER:
      return [...state]

    default:
      return state
  }
}
