import { AuthManager } from '../utils'
import {
  getProfile,
  updateProfile as updateProfileApi,
  updatePassword as updatePasswordApi,
  logout as logoutApi
} from '../utils/ApiManager'

import {
  AUTO_LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  LOGOUT,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR
} from '../actionTypes'

export const loginSuccess = data => async dispatch => {
  try {
    dispatch({ type: LOGIN_SUCCESS, data })
    await dispatch(fetchProfile())
    dispatch({
      type: 'SET_CONFIG',
      config: { layout: 'default-sidebar' }
    })
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, error })
  }
}

export const fetchProfile = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_REQUEST })
    const data = await getProfile()
    dispatch({ type: FETCH_PROFILE_SUCCESS, data: data })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_ERROR, error })
  }
}

export const autoLogin = () => async dispatch => {
  if (AuthManager.isAuthenticated()) {
    let data
    try {
      data = await getProfile()
    } catch (err) {
      console.log('autoLogin error', err)
    }
    if (data) {
      dispatch({ type: FETCH_PROFILE_SUCCESS, data: data })
    } else {
      dispatch({ type: AUTO_LOGIN_ERROR })
    }
  } else {
    dispatch({ type: AUTO_LOGIN_ERROR })
  }
}

export const logout = () => async dispatch => {
  try {
    let response = await logoutApi()
    // if (response.success) {
    AuthManager.clearAuthentication()
    dispatch({ type: LOGOUT })
    // }
    return response
  } catch (err) {
    console.error('Logout Error: ', err)
  }
  return {}
}

export const updateProfile = user => async dispatch => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST })
    const data = await updateProfileApi(user)
    if (data.success) {
      dispatch({ type: UPDATE_PROFILE_SUCCESS, data: user })
    } else {
      dispatch({ type: UPDATE_PROFILE_ERROR })
    }
    return data
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_ERROR, error })
  }
  return {}
}

export const updatePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST })
    const data = await updatePasswordApi(oldPassword, newPassword)
    if (data.success) {
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, data: data })
    } else {
      dispatch({ type: UPDATE_PASSWORD_ERROR })
    }
    return data
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_ERROR, error })
  }
  return {}
}
