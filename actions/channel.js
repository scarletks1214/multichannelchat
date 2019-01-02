import {
  CHANNEL_LOAD_ERROR,
  CHANNEL_LOAD_REQUESTED,
  CHANNEL_LOAD_SUCCEDED,
  CHANNEL_UPDATE_ERROR,
  CHANNEL_UPDATE_REQUESTED,
  CHANNEL_UPDATE_SUCCEDED
} from '../actionTypes'
import {
  loadChannels as loadChannelsApi,
  updateChannel as updateChannelApi
} from '../utils/ApiManager'
// import SampleChannelsJson from '../json/sample-channels.json'

export const loadChannels = workspace => async dispatch => {
  try {
    dispatch({ type: CHANNEL_LOAD_REQUESTED })
    const res = await loadChannelsApi(workspace.id)
    // const res = SampleChannelsJson
    console.log('response channels', res)
    if (res.success && res.response && res.response.channels) {
      //response.
      dispatch({
        type: CHANNEL_LOAD_SUCCEDED,
        data: res.response.channels
      })
    } else {
      dispatch({ type: CHANNEL_LOAD_ERROR })
    }
    return res
  } catch (err) {
    console.log(err)
    dispatch({ type: CHANNEL_LOAD_ERROR })
  }
}

export const updateChannel = (
  workspace,
  channel,
  channelData
) => async dispatch => {
  try {
    dispatch({ type: CHANNEL_UPDATE_REQUESTED })
    const res = await updateChannelApi(workspace.id, channel, channelData)
    if (res.success) {
      dispatch({
        type: CHANNEL_UPDATE_SUCCEDED,
        data: res.response.channel
      })
    } else {
      dispatch({ type: CHANNEL_UPDATE_ERROR })
    }
    return res
  } catch (err) {
    console.log(err)
    dispatch({ type: CHANNEL_UPDATE_ERROR })
  }
  return null
}
