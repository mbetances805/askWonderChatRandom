import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_EVENT_MANAGERS = 'GET_EVENT_MANAGERS'

// ACTION CREATORS
const getManagers = managers => ({type: GET_EVENT_MANAGERS, managers})

// THUNK CREATORS
export const fetchManagers = () =>
  dispatch =>
    axios.get(`/api/managers`)
      .then(res => { dispatch(getManagers(res.data)) })
      .catch(err => console.log(err))

// REDUCER
export default function (state = {allManagers: []}, action) {
  switch (action.type) {
    case GET_EVENT_MANAGERS:
      return {...state, allManagers: action.managers}
    default:
      return state
  }
}
