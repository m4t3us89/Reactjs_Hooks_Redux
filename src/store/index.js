import { createStore } from 'redux'

const INITIAL_STATE = {
  isLoading: false,
  message: ''
}

function reducer (state = INITIAL_STATE, action) {
  if (action.type === 'isLoading') {
    state.isLoading = true
    state.message = action.message
  } else if (action.type === 'notLoading') {
    state.isLoading = false
  }
  return state
}

export default createStore(reducer)
