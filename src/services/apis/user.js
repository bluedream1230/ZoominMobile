import Api from '../api'
import { LOG_OUT } from '../../store/actions'
import {
  API_RESETPASSWORD,
  API_UPDATE_PASS,
  API_UPDATE_USER_INFO,
  API_USER_SIGN_IN,
  API_USER_SIGN_UP,
} from '../../store/api'

export const login = async (data) => {
  return Api.post(API_USER_SIGN_IN, data)
}

export const signup = async (data) => {
  return Api.post(API_USER_SIGN_UP, data)
}

export const updatePass = async (data) => {
  return Api.post(API_UPDATE_PASS, data)
}

export const updateUserInfo = async (data, files) => {
  console.log('files', files)
  return Api.uploadFile(
    API_UPDATE_USER_INFO,
    { data: JSON.stringify(data) },
    {},
    files
  )
}

export const resetPassword = async (data) => {
  return Api.post(API_RESETPASSWORD, data)
}

export const logout = () => {
  return { type: LOG_OUT }
}
