import {
  // SET_INTENT,
  // LOAD_INTENT,
  // SET_INTENTS,
  // LOAD_INTENTS,
  // INTENTS_FETCH_REQUEST,
  // INTENTS_FETCH_SUCCESS,
  // INTENTS_FETCH_ERROR,
  INTENTS_FETCH_SINGLE_REQUEST,
  INTENTS_FETCH_SINGLE_SUCCESS,
  INTENTS_FETCH_SINGLE_ERROR,
  INTENTS_ADD_REQUEST,
  INTENTS_ADD_SUCCESS,
  INTENTS_ADD_ERROR,
  INTENTS_UPDATE_REQUEST,
  INTENTS_UPDATE_SUCCESS,
  INTENTS_UPDATE_ERROR,
  INTENTS_REMOVE_REQUEST,
  INTENTS_REMOVE_SUCCESS,
  INTENTS_REMOVE_ERROR,
  WORKSPACES_AUTO_LOAD_REQUEST
  // INTENTS_AUTO_LOAD_REQUEST,
  // INTENTS_AUTO_LOAD_SUCCESS,
  // INTENTS_AUTO_LOAD_ERROR
} from '../actionTypes'

const data = {
  intent: null,
  intentLoading: false
  // intents: [],
  // intentsLoading: false,
  // autoLoading: true
}
export function intent(state = data, action) {
  // let intents
  // let intent
  switch (action.type) {
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return data
    case INTENTS_ADD_REQUEST:
      return Object.assign({}, state, {
        intentLoading: true
      })
    case INTENTS_ADD_SUCCESS:
      // intents = [action.data, ...state.intents]
      return Object.assign({}, state, {
        intentLoading: false
        // intents
      })
    case INTENTS_UPDATE_REQUEST:
      return Object.assign({}, state, {
        intentLoading: true
      })
    case INTENTS_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        intentLoading: false
      })
    case INTENTS_REMOVE_REQUEST:
      return Object.assign({}, state, {
        intentLoading: true
      })
    case INTENTS_REMOVE_SUCCESS:
      return Object.assign({}, state, {
        intentLoading: false,
        intent: null
      })
    case INTENTS_FETCH_SINGLE_REQUEST:
      return Object.assign({}, state, {
        intentLoading: true
      })
    case INTENTS_FETCH_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        intent: action.intent,
        intentLoading: false
      })
    case INTENTS_FETCH_SINGLE_ERROR:
    case INTENTS_ADD_ERROR:
    case INTENTS_UPDATE_ERROR:
    case INTENTS_REMOVE_ERROR:
      return Object.assign({}, state, {
        intentLoading: false
      })
    default:
      return state
  }
}
