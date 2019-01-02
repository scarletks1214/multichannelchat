import {
  SET_WORKSPACE,
  LOAD_WORKSPACE,
  WORKSPACES_FETCH_REQUEST,
  WORKSPACES_FETCH_SUCCESS,
  WORKSPACES_FETCH_ERROR,
  WORKSPACES_FETCH_SINGLE_REQUEST,
  WORKSPACES_FETCH_SINGLE_SUCCESS,
  WORKSPACES_FETCH_SINGLE_ERROR,
  WORKSPACES_ADD_REQUEST,
  WORKSPACES_ADD_SUCCESS,
  WORKSPACES_ADD_ERROR,
  WORKSPACES_UPDATE_REQUEST,
  WORKSPACES_UPDATE_SUCCESS,
  WORKSPACES_UPDATE_ERROR,
  WORKSPACES_REMOVE_REQUEST,
  WORKSPACES_REMOVE_SUCCESS,
  WORKSPACES_REMOVE_ERROR,
  WORKSPACES_AUTO_LOAD_REQUEST,
  WORKSPACES_AUTO_LOAD_SUCCESS,
  WORKSPACES_AUTO_LOAD_ERROR,
  LOGOUT
} from '../actionTypes'

const data = {
  workspace: null,
  workspaceLoading: false,
  workspaces: [],
  autoLoading: true
}
export function workspace(state = data, action) {
  let workspaces
  let workspace
  switch (action.type) {
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return Object.assign({}, state, {
        workspace: null,
        autoLoading: true
      })
    case WORKSPACES_AUTO_LOAD_SUCCESS:
      return Object.assign({}, state, {
        autoLoading: false,
        workspace: action.data
      })
    case WORKSPACES_AUTO_LOAD_ERROR:
      return Object.assign({}, state, {
        workspace: null,
        autoLoading: false
      })
    case LOAD_WORKSPACE:
      return Object.assign({}, state, {
        workspaceLoading: true
      })
    case SET_WORKSPACE:
      return Object.assign({}, state, {
        workspace: action.workspace,
        workspaceLoading: false
      })
    case WORKSPACES_ADD_REQUEST:
      return Object.assign({}, state, {
        workspaceLoading: true
      })
    case WORKSPACES_ADD_SUCCESS:
      workspaces = [action.data, ...state.workspaces]
      return Object.assign({}, state, {
        workspaceLoading: false,
        workspaces
      })
    case WORKSPACES_UPDATE_REQUEST:
      return Object.assign({}, state, {
        workspaceLoading: true
      })
    case WORKSPACES_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        workspaceLoading: false
      })
    case WORKSPACES_REMOVE_REQUEST:
      return Object.assign({}, state, {
        workspaceLoading: true
      })
    case WORKSPACES_REMOVE_SUCCESS:
      workspaces = state.workspaces.filter(
        workspace => workspace.id !== action.data
      )
      workspace =
        !state.workspace || state.workspace.id === action.data
          ? null
          : state.workspace
      return Object.assign({}, state, {
        workspaceLoading: false,
        workspaces,
        workspace
      })
    case WORKSPACES_FETCH_REQUEST:
      return Object.assign({}, state, {
        workspaceLoading: true
      })
    case WORKSPACES_FETCH_SUCCESS:
      return Object.assign({}, state, {
        workspaces: action.data,
        workspaceLoading: false
      })
    case WORKSPACES_FETCH_SINGLE_REQUEST:
      return Object.assign({}, state, {
        workspaceLoading: true
      })
    case WORKSPACES_FETCH_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        workspace: action.workspace,
        workspaceLoading: false
      })
    case WORKSPACES_FETCH_ERROR:
    case WORKSPACES_FETCH_SINGLE_ERROR:
    case WORKSPACES_ADD_ERROR:
    case WORKSPACES_UPDATE_ERROR:
    case WORKSPACES_REMOVE_ERROR:
      return Object.assign({}, state, {
        workspaceLoading: false
      })
    case LOGOUT:
      return data
    default:
      return state
  }
}
