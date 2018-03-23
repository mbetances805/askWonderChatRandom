import axios from 'axios'

// ACTION TYPES
const GET_PENDING_STATUS = 'GET_PENDING STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'

// ACTION CREATORS
const getPendingStatus = status => ({type: GET_PENDING_STATUS, status})
const updateStatus = products => ({type: UPDATE_STATUS, products})

// THUNK CREATORS
export const fetchStatus = () =>
  dispatch =>
    axios.get(`/api/managersstatus`)
      .then(res => { dispatch(getPendingStatus(res.data)) })
      .catch(err => console.log(err))

export const modifyStatus = products =>
  dispatch =>
      axios.put(`/api/managersstatus`, products)
        .then(products => { dispatch(updateStatus(products)) })
        .catch(error => console.log(error))

// REDUCER
export default function (state = {allManagers: []}, action) {
  switch (action.type) {
    case GET_PENDING_STATUS:
      return {...state, allManagers: action.status}

    case UPDATE_STATUS:
      return state.allManagers.filter(product => product.productId !== action.products.productId).concat(action.products)

    default:
      return state
  }
}
