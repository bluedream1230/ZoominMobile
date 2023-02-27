import { combineReducers } from 'redux'

// reducer import
import authReducer from './authReducer'
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  auth: authReducer,
})

export default reducer
