import Api from '../api'
import {
  API_GET_ATTENDS,
  API_GET_EVENTS,
  API_GET_REDEMPTIONS,
  API_GET_REWARDS,
  API_UPDATE_ATTENDS,
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

export const createAttend = async (data) => {
  return Api.post(API_GET_ATTENDS, data)
}

export const updateAttend = async (data, eventId, id) => {
  return Api.post(API_UPDATE_ATTENDS, data, { eventId, id })
}

export const getRedemptions = async (id) => {
  return Api.get(API_GET_REDEMPTIONS, {}, { id })
}
