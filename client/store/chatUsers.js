import socket from '../socket'

let initialState = {
  list: [],
  justEntered: ''
}

const GET_COLLABORATORS = 'GET_COLLABORATORS'
const ANNOUNCE_COLLABORATOR = 'ANNOUNCE_COLLABORATOR'
const DENNOUNCE_COLLABORATOR = 'DENNOUNCE_COLLABORATOR'
const ANNOUNCE_SELF = 'ANNOUNCE_SELF'

export const getCollaborators = collaborators => ({ type: GET_COLLABORATORS, collaborators })
export const enterCollaborator = collaborator => ({type: ANNOUNCE_COLLABORATOR, collaborator})
export const clearOldCollaborator = () => ({type: DENNOUNCE_COLLABORATOR})
export const enterSelf = collaborator => ({type: ANNOUNCE_SELF, collaborator})

export const announceCollaborator = (userId, whiteboardId) => dispatch => {
  socket.emit('enter-room', user.data, whiteboardId)
}

export const denounceCollaborator = () => dispatch => { dispatch(clearOldCollaborator()) }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLLABORATORS:
      return Object.assign({}, state, {
        list: action.collaborators,
        justEntered: ''
      })

    case ANNOUNCE_COLLABORATOR:
      return Object.assign({}, state, {
        list: [...state.list.filter(co => co.id != action.collaborator.id), action.collaborator],
        justEntered: action.collaborator.name
      })

    case ANNOUNCE_SELF:
    return Object.assign({}, state, {
      list: [...state.list.filter(co => co.id != action.collaborator.id), action.collaborator]})

    case DENNOUNCE_COLLABORATOR:
    return Object.assign({}, state, {
      list: [...state.list],
      justEntered: ''
    })
    default:
      return state;
  }

}
