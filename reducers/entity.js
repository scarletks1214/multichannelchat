import {
  ENTITY_LOAD_REQUESTED,
  ENTITY_LOAD_SUCCEDED,
  ENTITY_LOAD_ERROR,
  ENTITY_SAVE_REQUESTED,
  ENTITY_SAVE_SUCCEDED,
  ENTITY_SAVE_ERROR,
  WORKSPACES_AUTO_LOAD_REQUEST
} from '../actionTypes'

const initialState = {
  entities: null,
  isLoading: false
}

export const entity = (state = initialState, { type, entities }) => {
  switch (type) {
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return initialState
    case ENTITY_LOAD_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case ENTITY_LOAD_SUCCEDED:
      return Object.assign({}, state, { entities, isLoading: false })
    case ENTITY_LOAD_ERROR:
      return Object.assign({}, state, { entities: null, isLoading: false })
    case ENTITY_SAVE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case ENTITY_SAVE_SUCCEDED:
      return Object.assign({}, state, { entities, isLoading: false })
    case ENTITY_SAVE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    default:
      return state
  }
}
