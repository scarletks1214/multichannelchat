import { AuthManager } from '../utils'
import {
  AUTO_LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
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

const initialState = {
  user: null,
  autoLoggingIn: true,
  signedUp: false,
  isLoading: false,
  error: null
}

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case FETCH_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      }

    case LOGIN_SUCCESS:
      AuthManager.saveAuthentication(action.data)
      return state

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signedUp: true,
        error: null,
        isLoading: false
      }

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        autoLoggingIn: false,
        isLoading: false,
        user: action.data.profile
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.data
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case AUTO_LOGIN_ERROR:
      AuthManager.clearAuthentication()
      return {
        ...state,
        user: null,
        autoLoggingIn: false,
        isLoading: false,
        error: action.error
      }
    case UPDATE_PROFILE_ERROR:
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case FETCH_PROFILE_ERROR:
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
      return {
        ...state,
        user: null,
        autoLoggingIn: false,
        isLoading: false,
        error: action.error
      }

    case LOGOUT:
      return {
        ...state,
        user: null
      }

    default:
      return state
  }
}
