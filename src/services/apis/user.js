import Api from '../api'
import { LOG_OUT } from '../../store/actions'
import { API_USER_SIGN_IN, API_USER_SIGN_UP } from '../../store/api'

export const login = async (data) => {
  return Api.post(API_USER_SIGN_IN, data)
}

export const signup = async (data) => {
  return Api.post(API_USER_SIGN_UP, data)
}

export const logout = () => {
  return { type: LOG_OUT }
}
