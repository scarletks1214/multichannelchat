import { addNotification as notify } from 'reapop'
import {
  ENTITY_LOAD_REQUESTED,
  ENTITY_LOAD_SUCCEDED,
  ENTITY_LOAD_ERROR,
  ENTITY_SAVE_REQUESTED,
  ENTITY_SAVE_SUCCEDED,
  ENTITY_SAVE_ERROR
} from '../actionTypes'

import {
  loadEntities as loadEntitiesApi,
  addEntities as addEntitiesApi
} from '../utils/ApiManager'

export const loadEntities = workspaceId => async dispatch => {
  try {
    dispatch({ type: ENTITY_LOAD_REQUESTED })
    const res = await loadEntitiesApi(workspaceId)
    if (res.success) {
      dispatch({ type: ENTITY_LOAD_SUCCEDED, entities: res.response.entities })
    } else {
      dispatch({ type: ENTITY_LOAD_ERROR })
    }
    return res
  } catch (err) {
    dispatch({ type: ENTITY_LOAD_ERROR })
  }
}

export const saveEntities = (workspaceId, entities) => async dispatch => {
  dispatch({ type: ENTITY_SAVE_REQUESTED })
  const response = await addEntitiesApi(workspaceId, entities)
  if (response.success) {
    dispatch({
      type: ENTITY_SAVE_SUCCEDED,
      entities
    })
    dispatch(
      notify({
        title: `Success`,
        message: 'Successfully saved entities',
        status: 200,
        position: 'tr',
        dismissible: true
      })
    )
  } else {
    dispatch({ type: ENTITY_SAVE_ERROR })
    dispatch(
      notify({
        title: `Error`,
        message: 'Fail to save entities',
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    )
  }
}
