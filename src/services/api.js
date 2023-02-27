// import { onApplicationError } from 'actions/application.action';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import isString from 'lodash/isString'
import { store } from '../store'

class Api {
  static get(route, data, params) {
    return this.xhr(route, data, params, 'get')
  }

  static put(route, data, params) {
    return this.xhr(route, data, params, 'put')
  }

  static post(route, data, params) {
    return this.xhr(route, data, params, 'post')
  }

  static delete(route, data, params) {
    return this.xhr(route, data, params, 'delete')
  }

  static replaceVariables(route, params) {
    Object.keys(params).forEach((key) => {
      route = route.replace(`:${key}`, params[key])
    })
    return route
  }

  static wrapApiErrors(error) {
    try {
      const { status, data } = error.response || {}
      if (!status) {
        throw new Error('Connection with API server is broken')
      }
      if (status === 401) {
        const state = store.getState()
        const {
          auth: { token },
        } = state
        if (token) {
          store.dispatch({ type: 'AUTH_LOGOUT' })
          throw new Error('Unauthorized')
        }
      }
      const { message } = data
      if (!message) {
        throw new Error(data)
      }

      if (isString(message)) {
        throw new Error(message)
      }
      if (status === 400) {
        if (Array.isArray(message)) throw new Error(message[0])
        const { problems = [] } = message
        const mes = problems.reduce((str, problem) => `${str}\n${problem}`, '')
        throw new Error(mes)
      }
      throw new Error('Unknown error')
    } catch (e) {
      console.log('API error', e)
      // store.dispatch(onApplicationError(e));
      throw e
    }
  }

  static xhr(route, data = {}, params = {}, method) {
    const state = store.getState()

    const sendRequest = (axiosInstance) => {
      const url = Api.replaceVariables(route, params)
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':
          'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      }
      if (
        route !==
          'https://saviour.earth/ZoomIn/api/index.php/Trivia/addTrivia' &&
        state.auth.token
      ) {
        headers.Authorization = `Bearer ${state.auth.token}`
      }

      const options = {
        baseURL: 'http://10.0.2.2:3000',
        url,
        method,
        headers,
        timeout: 15000,
      }

      if (method === 'get') {
        options.params = data
      } else {
        options.data = data
      }

      return axiosInstance(options)
        .then((res) => res.data)
        .catch((err) => {
          return Api.wrapApiErrors(err)
        })
    }
    return sendRequest(axios.create())
  }

  // static uploadFile(route, data, params, files) {
  //   const state = store.getState()
  //   console.log('apidata:', route, data, params, files)

  //   const sendRequest = (axiosInstance) => {
  //     const url = Api.replaceVariables(route, params)
  //     const headers = {
  //       'Content-Type': 'multipart/form-data',
  //     }

  //     if (state.auth.token) {
  //       headers.Authorization = `Bearer ${state.auth.token}`
  //     }

  //     var formData = new FormData()
  //     for (const file of files) {
  //       console.log('file::', file)
  //       // formData.append('file', file);
  //       formData.append('file[]', file)
  //     }
  //     console.log('formdata:', formData)
  //     Object.keys(data).forEach((key) => formData.append(key, data[key]))

  //     const options = {
  //       baseURL: process.env.REACT_APP_API_URL,
  //       url,
  //       method: 'post',
  //       headers,
  //       timeout: 30000,
  //       data: formData,
  //     }

  //     return axiosInstance(options)
  //       .then((res) => res.data)
  //       .catch((err) => {
  //         return Api.wrapApiErrors(err)
  //       })
  //   }
  //   return sendRequest(axios.create())
  // }
}
export default Api
