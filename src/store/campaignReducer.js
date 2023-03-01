import * as actionTypes from './actions'

export const campaignState = {
  events: [],
  rewards: [],
  attends: [],
}

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const campaignReducer = (state = campaignState, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS:
      return {
        ...state,
        events: action.events,
      }
    case actionTypes.GET_REWARDS:
      return {
        ...state,
        rewards: action.rewards,
      }
    case actionTypes.GET_ATTENDS:
      return {
        ...state,
        attends: action.attends,
      }
    default:
      return state
  }
}

export default campaignReducer
