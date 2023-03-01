import { combineReducers } from 'redux'

// reducer import
import authReducer from './authReducer'
import campaignReducer from './campaignReducer'
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  auth: authReducer,
  campaign: campaignReducer,
})

export default reducer
