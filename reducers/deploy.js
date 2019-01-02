import {
  WORKSPACES_DEPLOY_REQUEST,
  WORKSPACES_DEPLOY_ERROR,
  WORKSPACES_DEPLOY_SUCCESS,
  DEPLOY_LOAD_ERROR,
  DEPLOY_LOAD_REQUEST,
  DEPLOY_LOAD_SUCCESS,
  DEPLOY_CANCEL_ERROR,
  DEPLOY_CANCEL_REQUEST,
  DEPLOY_CANCEL_SUCCESS,
  WORKSPACES_AUTO_LOAD_REQUEST
} from '../actionTypes'

const data = {
  // deploy: null,
  deploying: false,
  deploys: [],
  loading: false
  // autoLoading: true
}
export function deploy(state = data, action) {
  let deploys
  switch (action.type) {
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return data
    case WORKSPACES_DEPLOY_REQUEST:
    case DEPLOY_CANCEL_REQUEST:
    case DEPLOY_LOAD_REQUEST:
      return Object.assign({}, state, {
        deploying: true
      })
    case WORKSPACES_DEPLOY_SUCCESS:
      deploys = [action.data, ...state.deploys]
      return Object.assign({}, state, {
        deploying: false,
        deploys: deploys
      })
    case DEPLOY_CANCEL_SUCCESS:
      deploys = state.deploys.filter(
        deploy => deploy.data_id !== action.data.data_id
      )
      return Object.assign({}, state, {
        deploying: false,
        deploys: deploys
      })
    case DEPLOY_LOAD_SUCCESS:
      return Object.assign({}, state, {
        deploying: false,
        deploys: action.data
      })
    case WORKSPACES_DEPLOY_ERROR:
    case DEPLOY_CANCEL_ERROR:
    case DEPLOY_LOAD_ERROR:
      return Object.assign({}, state, {
        deploying: false
      })
    default:
      return state
  }
}
