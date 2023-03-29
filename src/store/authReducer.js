import * as actionTypes from './actions'

export const authState = {
  token: null,
  userInfo: [],
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
    case actionTypes.USERINFO:
      return {
        ...state,
        userInfo: action.userInfo,
      }
    default:
      return state
  }
}

export default authReducer
