import {
  // INTENTS_LOAD_ERROR,
  // INTENTS_LOAD_REQUEST,
  // INTENTS_LOAD_SUCCESS,
  INTENTS_ADD_REQUEST,
  INTENTS_ADD_SUCCESS,
  INTENTS_ADD_ERROR,
  INTENTS_REMOVE_REQUEST,
  INTENTS_REMOVE_SUCCESS,
  INTENTS_REMOVE_ERROR,
  INTENTS_UPDATE_REQUEST,
  INTENTS_UPDATE_SUCCESS,
  INTENTS_UPDATE_ERROR,
  INTENTS_FETCH_SINGLE_ERROR,
  INTENTS_FETCH_SINGLE_REQUEST,
  INTENTS_FETCH_SINGLE_SUCCESS
} from '../actionTypes'

import {
  loadIntent as loadIntentApi,
  // loadIntents as loadIntentsApi,
  createIntent as createIntentApi,
  deleteIntent as deleteIntentApi,
  updateIntent as updateIntentApi
} from '../utils/ApiManager'
import { unCompressJson } from '../utils/Converters'

export const loadIntent = (workspace, intentId) => async dispatch => {
  try {
    dispatch({ type: INTENTS_FETCH_SINGLE_REQUEST })
    let data = await loadIntentApi(workspace.id, intentId)
    let parsedIntent
    if (data.success) {
      parsedIntent = unCompressJson(data.response.intent)
      dispatch({
        type: INTENTS_FETCH_SINGLE_SUCCESS,
        data: parsedIntent
      })
    } else {
      dispatch({ type: INTENTS_FETCH_SINGLE_ERROR })
    }
    return parsedIntent
  } catch (error) {
    dispatch({ type: INTENTS_FETCH_SINGLE_ERROR })
  }
  return null
}

export const createIntent = (workspace, intent) => async dispatch => {
  try {
    dispatch({ type: INTENTS_ADD_REQUEST })
    let data = await createIntentApi(workspace.id, intent)
    if (data.success) {
      dispatch({ type: INTENTS_ADD_SUCCESS })
    } else {
      dispatch({ type: INTENTS_ADD_ERROR })
    }
    return data
  } catch (err) {
    console.log('createIntent error', err)
    dispatch({ type: INTENTS_ADD_ERROR })
  }

  return null
}

export const updateIntent = (workspace, intentId, intent) => async dispatch => {
  try {
    dispatch({ type: INTENTS_UPDATE_REQUEST })
    let data = await updateIntentApi(workspace.id, intentId, intent)
    if (data.success) {
      dispatch({ type: INTENTS_UPDATE_SUCCESS })
    } else {
      dispatch({ type: INTENTS_UPDATE_ERROR })
    }
    return data
  } catch (err) {
    console.log('updateIntent error', err)
    dispatch({ type: INTENTS_UPDATE_ERROR })
  }

  return null
}

export const deleteIntent = (workspace, intent) => async dispatch => {
  try {
    dispatch({ type: INTENTS_REMOVE_REQUEST })
    let data = await deleteIntentApi(workspace.id, intent.id)
    if (data.success) {
      dispatch({ type: INTENTS_REMOVE_SUCCESS, data: intent.id })
    } else {
      dispatch({ type: INTENTS_REMOVE_ERROR })
    }
    return data
  } catch (err) {
    console.log('deleteIntent error', err)
    dispatch({ type: INTENTS_REMOVE_ERROR })
  }

  return null
}
