import { addNotification as notify } from 'reapop'

import {
  SMALL_TALK_LOAD_REQUESTED,
  SMALL_TALK_LOAD_SUCCEEDED,
  SMALL_TALK_LOAD_ERROR,
  SMALL_TALK_CATEGORY_UPDATE_REQUESTED,
  SMALL_TALK_CATEGORY_UPDATE_SUCCEEDED,
  SMALL_TALK_CATEGORY_UPDATE_ERROR,
  SMALL_TALK_UPDATE_REQUESTED,
  SMALL_TALK_UPDATE_SUCCEEDED,
  SMALL_TALK_UPDATE_ERROR,
  SMALL_TALK_DELETE_REQUESTED,
  SMALL_TALK_DELETE_ERROR,
  SMALL_TALK_DELETE_SUCCEEDED
} from '../actionTypes'
import {
  loadSmallTalks as loadSmallTalksApi,
  updateSmallTalks as updateSmallTalksApi,
  updateSmallTalksCategory as updateSmallTalksCategoryApi,
  deleteSmallTalk as deleteSmallTalkApi
} from '../utils/ApiManager'

export const loadSmallTalks = workspaceId => async dispatch => {
  dispatch({ type: SMALL_TALK_LOAD_REQUESTED })
  const {
    success,
    statusMsg,
    response: { smallTalks, categories }
  } = await loadSmallTalksApi(workspaceId)
  if (success) {
    dispatch({
      type: SMALL_TALK_LOAD_SUCCEEDED,
      smallTalks,
      categories
    })
  } else {
    dispatch({ type: SMALL_TALK_LOAD_ERROR })
    dispatch(
      notify({
        title: `Error`,
        message: statusMsg,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    )
  }
}

export const updateCategories = (workspaceId, categories) => async dispatch => {
  dispatch({ type: SMALL_TALK_CATEGORY_UPDATE_REQUESTED })
  const res = await updateSmallTalksCategoryApi(workspaceId, categories)
  if (res.success) {
    dispatch({
      type: SMALL_TALK_CATEGORY_UPDATE_SUCCEEDED,
      categories: categories.map(category => ({ name: category }))
    })
    dispatch(
      notify({
        title: `Success`,
        message: `Successfully saved categories`,
        status: 200,
        position: 'tr',
        dismissible: true
      })
    )
  } else {
    dispatch({ type: SMALL_TALK_CATEGORY_UPDATE_ERROR })
    dispatch(
      notify({
        title: `Error`,
        message: `Failed to save data`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    )
  }
}

export const updateSmallTalks = (workspaceId, smallTalks) => async dispatch => {
  dispatch({ type: SMALL_TALK_UPDATE_REQUESTED })
  const res = await updateSmallTalksApi(workspaceId, smallTalks)
  if (res.success) {
    dispatch({ type: SMALL_TALK_UPDATE_SUCCEEDED, smallTalks })
    dispatch(
      notify({
        title: `Success`,
        message: `Successfully saved questions`,
        status: 200,
        position: 'tr',
        dismissible: true
      })
    )
  } else {
    dispatch({ type: SMALL_TALK_UPDATE_ERROR })
    dispatch(
      notify({
        title: `Error`,
        message: `Failed to save data`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    )
  }
}

export const deleteSmallTalk = (workspaceId, smallTalk) => async dispatch => {
  try {
    dispatch({ type: SMALL_TALK_DELETE_REQUESTED })
    const res = await deleteSmallTalkApi(workspaceId, smallTalk.id)
    if (res.success) {
      dispatch({ type: SMALL_TALK_DELETE_SUCCEEDED, data: smallTalk.id })
    } else {
      dispatch({ type: SMALL_TALK_DELETE_ERROR })
    }
    return res
  } catch (err) {
    dispatch({ type: SMALL_TALK_DELETE_ERROR })
  }
  return null
}
