import Api from '../api'
import {
  API_GET_ATTENDS,
  API_GET_EVENTS,
  API_GET_REWARDS,
} from '../../store/api'

export const getRewards = async () => {
  return Api.get(API_GET_REWARDS)
}

export const getEvents = async () => {
  return Api.get(API_GET_EVENTS)
}

export const getAttends = async () => {
  return Api.get(API_GET_ATTENDS)
}
