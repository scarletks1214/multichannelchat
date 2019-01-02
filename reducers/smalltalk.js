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
  SMALL_TALK_DELETE_SUCCEEDED,
  SMALL_TALK_DELETE_ERROR,
  WORKSPACES_AUTO_LOAD_REQUEST
} from '../actionTypes'

const initialState = {
  categories: [],
  smallTalks: [],
  isLoading: false,
  isLoaded: false
}

export const smalltalks = (
  state = initialState,
  { type, categories, smallTalks, data }
) => {
  switch (type) {
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return initialState
    case SMALL_TALK_LOAD_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case SMALL_TALK_LOAD_SUCCEEDED:
      return Object.assign({}, state, {
        categories,
        smallTalks,
        isLoading: false,
        isLoaded: true
      })
    case SMALL_TALK_LOAD_ERROR:
      return Object.assign({}, state, {
        categories: [],
        smallTalks: [],
        isLoading: false
      })
    case SMALL_TALK_CATEGORY_UPDATE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case SMALL_TALK_CATEGORY_UPDATE_SUCCEEDED:
      return Object.assign({}, state, { categories, isLoading: false })
    case SMALL_TALK_CATEGORY_UPDATE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    case SMALL_TALK_UPDATE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case SMALL_TALK_UPDATE_SUCCEEDED:
      return Object.assign({}, state, { smallTalks, isLoading: false })
    case SMALL_TALK_UPDATE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    case SMALL_TALK_DELETE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case SMALL_TALK_DELETE_SUCCEEDED:
      return Object.assign({}, state, {
        smallTalks: state.smallTalks.filter(smallTalk => smallTalk.id !== data),
        isLoading: false
      })
    case SMALL_TALK_DELETE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    default:
      return state
  }
}
