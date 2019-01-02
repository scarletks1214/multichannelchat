import {
  WORKSPACES_DEPLOY_ERROR,
  WORKSPACES_DEPLOY_REQUEST,
  WORKSPACES_DEPLOY_SUCCESS,
  DEPLOY_LOAD_ERROR,
  DEPLOY_LOAD_REQUEST,
  DEPLOY_LOAD_SUCCESS,
  DEPLOY_CANCEL_ERROR,
  DEPLOY_CANCEL_REQUEST,
  DEPLOY_CANCEL_SUCCESS
} from '../actionTypes'

import {
  deployWorkspace as deployWorkspaceApi,
  loadDeploys as loadDeploysApi,
  cancelDeploy as cancelDeployApi
} from '../utils/ApiManager'

export const deployWorkspace = workspace => async dispatch => {
  try {
    dispatch({ type: WORKSPACES_DEPLOY_REQUEST })
    let data = await deployWorkspaceApi(workspace.id)
    console.log('Deploy Workspace Return', data)
    if (data.success) {
      dispatch({
        type: WORKSPACES_DEPLOY_SUCCESS,
        data: data.response.deployResponse
      })
    } else {
      dispatch({ type: WORKSPACES_DEPLOY_ERROR })
    }
    return data
  } catch (err) {
    console.log('deployWorkspace error', err)
    dispatch({ type: WORKSPACES_DEPLOY_ERROR })
  }

  return null
}

export const loadDeploys = workspaceId => async dispatch => {
  try {
    dispatch({ type: DEPLOY_LOAD_REQUEST })
    let data = await loadDeploysApi(workspaceId)
    console.log('Load Deploys Return', data)
    if (data.success) {
      dispatch({ type: DEPLOY_LOAD_SUCCESS, data: data })
    } else {
      dispatch({ type: DEPLOY_LOAD_ERROR })
    }
    return data
  } catch (err) {
    console.log('Load Deploys error', err)
    dispatch({ type: DEPLOY_LOAD_ERROR })
  }

  return null
}

export const cancelDeploy = deploy => async dispatch => {
  try {
    dispatch({ type: DEPLOY_CANCEL_REQUEST })
    let data = await cancelDeployApi(deploy.data_id)
    console.log('Cancel Workspace Return', data)
    if (data.success) {
      dispatch({ type: DEPLOY_CANCEL_SUCCESS, data: data })
    } else {
      dispatch({ type: DEPLOY_CANCEL_ERROR })
    }
    return data
  } catch (err) {
    console.log('Cancel Workspace error', err)
    dispatch({ type: DEPLOY_CANCEL_ERROR })
  }

  return null
}
