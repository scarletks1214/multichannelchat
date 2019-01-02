import {
  // SET_WORKSPACE,
  // LOAD_WORKSPACE,
  WORKSPACES_AUTO_LOAD_ERROR,
  WORKSPACES_AUTO_LOAD_REQUEST,
  WORKSPACES_AUTO_LOAD_SUCCESS,
  WORKSPACES_FETCH_REQUEST,
  WORKSPACES_FETCH_ERROR,
  WORKSPACES_FETCH_SUCCESS,
  WORKSPACES_ADD_REQUEST,
  WORKSPACES_ADD_SUCCESS,
  REFRESH_NAVIGATION_WITH_WORKSPACE,
  REFRESH_NAVIGATION_WITH_WORKSPACES,
  WORKSPACES_REMOVE_REQUEST,
  WORKSPACES_REMOVE_SUCCESS,
  WORKSPACES_REMOVE_ERROR,
  WORKSPACES_ADD_ERROR
} from '../actionTypes'
import * as WorkspaceManager from '../utils/WorkspaceManager'
import {
  loadWorkspace as loadWorkspaceApi,
  loadWorkspaces as loadWorkspacesApi,
  createWorkspace as createWorkspaceApi,
  deleteWorkspace as deleteWorkspaceApi
} from '../utils/ApiManager'
import { loadEntities } from './entity'
// import { loadDeploys } from './deploy'

// import { setSideBarFromWorkspace } from './navbar'

// function parseWorkSpaceJson(json) {
//   let workspace = {
//     language: json.language,
//     organisation: json.organisation,
//     intents: []
//   }
//   let intents = json.classifier.intents
//   Object.keys(intents).forEach(function(key, index) {
//     // key: the name of the object key
//     // index: the ordinal position of the key within the object
//     workspace.intents.push({ name: key, ...intents[key] })
//   })
//   return workspace
// }

export const loadWorkspace = ({ workspaceId }) => async dispatch => {
  // dispatch({ type: LOAD_WORKSPACE })
  // setTimeout(() => {
  //   dispatch({
  //     type: SET_WORKSPACE,
  //     workspace: parseWorkSpaceJson(SampleWorkspace)
  //   })
  // }, 1000)
  // return null
}

export const loadWorkspaces = () => async dispatch => {
  try {
    dispatch({ type: WORKSPACES_FETCH_REQUEST })
    let data = await loadWorkspacesApi()
    if (data.success) {
      dispatch({
        type: WORKSPACES_FETCH_SUCCESS,
        data: data.response.workspaces || []
      })
      dispatch({
        type: REFRESH_NAVIGATION_WITH_WORKSPACES,
        workspaces: data.response.workspaces || []
      })
    } else {
      dispatch({ type: WORKSPACES_FETCH_ERROR })
    }
    return data
  } catch (err) {
    console.log('loadWorkspaces error', err)
    dispatch({ type: WORKSPACES_FETCH_ERROR })
  }

  return null
}

export const autoloadWorkspace = (
  shouldLoadEntity = false
) => async dispatch => {
  try {
    if (WorkspaceManager.isWorkspaceSet()) {
      dispatch({ type: WORKSPACES_AUTO_LOAD_REQUEST })
      let data = await loadWorkspaceApi(WorkspaceManager.getWorkspaceId())
      if (shouldLoadEntity) {
        dispatch(loadEntities(WorkspaceManager.getWorkspaceId()))
      }
      // dispatch(loadDeploys(WorkspaceManager.getWorkspaceId()))
      if (data.success) {
        dispatch({
          type: WORKSPACES_AUTO_LOAD_SUCCESS,
          data: data.response.workspace
        })
        dispatch({
          type: REFRESH_NAVIGATION_WITH_WORKSPACE,
          workspace: data.response.workspace
        })
      } else {
        WorkspaceManager.clearWorkspace()
        dispatch({ type: WORKSPACES_AUTO_LOAD_ERROR })
      }
      return data
    } else {
      dispatch({ type: WORKSPACES_AUTO_LOAD_ERROR })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: WORKSPACES_AUTO_LOAD_ERROR })
  }
  return null
}

export const silentLoadWorkspace = (
  shouldLoadEntity = false
) => async dispatch => {
  try {
    if (WorkspaceManager.isWorkspaceSet()) {
      let data = await loadWorkspaceApi(WorkspaceManager.getWorkspaceId())
      if (shouldLoadEntity) {
        dispatch(loadEntities(WorkspaceManager.getWorkspaceId()))
      }
      if (data.success) {
        dispatch({
          type: WORKSPACES_AUTO_LOAD_SUCCESS,
          data: data.response.workspace
        })
        dispatch({
          type: REFRESH_NAVIGATION_WITH_WORKSPACE,
          workspace: data.response.workspace
        })
      }
      return data
    }
  } catch (error) {
    console.log('Silent Load Error: ', error)
  }
  return null
}
export const createWorkspace = workspace => async dispatch => {
  try {
    dispatch({ type: WORKSPACES_ADD_REQUEST })
    let data = await createWorkspaceApi(workspace)
    if (data.success) {
      dispatch({ type: WORKSPACES_ADD_SUCCESS, data: data.response.workspace })
    } else {
      dispatch({ type: WORKSPACES_ADD_ERROR })
    }
    return data
  } catch (err) {
    console.log('createWorkspace error', err)
    dispatch({ type: WORKSPACES_ADD_ERROR })
  }

  return null
}

export const deleteWorkspace = workspace => async dispatch => {
  try {
    dispatch({ type: WORKSPACES_REMOVE_REQUEST })
    let data = await deleteWorkspaceApi(workspace.id)
    if (data.success) {
      dispatch({ type: WORKSPACES_REMOVE_SUCCESS, data: workspace.id })
    } else {
      dispatch({ type: WORKSPACES_REMOVE_ERROR })
    }
    return data
  } catch (err) {
    console.log('deleteWorkspace error', err)
    dispatch({ type: WORKSPACES_REMOVE_ERROR })
  }

  return null
}
