import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

// ACTION CREATORS
const addProduct = product => ({type: ADD_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})
const updateProducts = products => ({type: UPDATE_PRODUCTS, products})

// THUNK CREATORS
export const postProduct = product =>
  dispatch => {
    axios.post(`/api/products`, product)
      .then(res => res.data)
      .then(newProduct => { dispatch(addProduct(newProduct)) })
      .catch(err => console.log(err))
  }

export const fetchProducts = () =>
  dispatch =>
    axios.get(`/api/products/pending`)
      .then(res => dispatch(getProducts(res.data)))
      .catch(err => console.log(err))

export const modifyProducts = products =>
  dispatch =>
    axios.put(`/api/products/pending`, products)
      .then(products => dispatch(updateProducts(products.data)))
      .catch(error => console.log(error))

// REDUCER
export default function (state = {allProducts: []}, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...state, allProducts: [...state.allProducts, action.product]}

    case GET_PRODUCTS:
      return {...state, allProducts: action.products}

    case UPDATE_PRODUCTS:
      return state.allProducts.filter(product => product.id !== action.product.id).concat(action.product)

    default:
      return state
  }
}
