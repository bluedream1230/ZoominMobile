import * as actionTypes from './actions'

export const authState = {
  token: null,
}

const authReducer = (state = authState, action) => {
  let id
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case actionTypes.LOG_OUT:
      return {
        ...authState,
      }
    default:
      return state
  }
}

export default authReducer
