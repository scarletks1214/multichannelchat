import {
  CHANNEL_LOAD_ERROR,
  CHANNEL_LOAD_REQUESTED,
  CHANNEL_LOAD_SUCCEDED,
  CHANNEL_UPDATE_ERROR,
  CHANNEL_UPDATE_REQUESTED,
  CHANNEL_UPDATE_SUCCEDED,
  WORKSPACES_AUTO_LOAD_REQUEST
} from '../actionTypes'

const initialState = {
  channels: [],
  isLoading: false
}

export const channel = (state = initialState, { type, data }) => {
  let channels
  switch (type) {
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return initialState
    case CHANNEL_LOAD_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case CHANNEL_LOAD_SUCCEDED:
      return Object.assign({}, state, {
        channels: data,
        isLoading: false
      })
    case CHANNEL_LOAD_ERROR:
      return Object.assign({}, state, {
        isLoading: false
      })
    case CHANNEL_UPDATE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case CHANNEL_UPDATE_SUCCEDED:
      channels = state.channels.map(
        channel => (channel.channel === data.channel ? data : channel)
      )
      return Object.assign({}, state, { channels, isLoading: false })
    case CHANNEL_UPDATE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    default:
      return state
  }
}
