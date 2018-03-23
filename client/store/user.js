import axios from 'axios'

const defaultUser = {}

const CREATE_USER = 'CREATE_USER'

export const createUser = user => ({ type: CREATE_USER, user })

export const postUser = (userName) =>
  dispatch =>
    axios.post(`/user/${userName}`, userName)
      .then(res => { console.log('username axios.post', userName); dispatch(createUser(res.data)) })
      .catch(error => console.log(error))

export default function (state = defaultUser, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user
    default:
      return state
  }
}
