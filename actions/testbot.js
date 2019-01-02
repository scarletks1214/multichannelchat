import {
  TESTBOT_QUERY_REQUEST,
  TESTBOT_QUERY_SUCCESS,
  TESTBOT_QUERY_ERROR,
  TESTBOT_HIDE,
  TESTBOT_SHOW,
  TESTBOT_WITHFLOW_QUERY_REQUEST,
  TESTBOT_WITHFLOW_QUERY_SUCCESS,
  TESTBOT_WITHFLOW_QUERY_ERROR
} from '../actionTypes'
import {
  queryTestbots as queryTestbotsApi,
  queryWithFlowTestbots as queryWithFlowTestbotsApi
} from '../utils/ApiManager'

export const queryTestbots = (workspace, input) => async dispatch => {
  try {
    dispatch({ type: TESTBOT_QUERY_REQUEST })
    let data = await queryTestbotsApi(workspace, input)
    if (data.queries) {
      dispatch({
        type: TESTBOT_QUERY_SUCCESS,
        data: data
      })
    } else {
      dispatch({ type: TESTBOT_QUERY_ERROR })
    }
    return data
  } catch (err) {
    console.log('loadWorkspaces error', err)
    dispatch({ type: TESTBOT_QUERY_ERROR })
  }

  return null
}

export const queryWithFlowTestbots = (workspace, input) => async dispatch => {
  try {
    dispatch({
      type: TESTBOT_WITHFLOW_QUERY_REQUEST,
      data: { message: input, author: 'me' }
    })
    let data = await queryWithFlowTestbotsApi(workspace, input)
    if (data.messages) {
      let newMessages = data.messages
        .filter(message => message.message.type === 'text')
        .map(message => {
          return {
            message: message.message.text,
            author: 'testbot',
            originalData: data
          }
        })
      dispatch({
        type: TESTBOT_WITHFLOW_QUERY_SUCCESS,
        data: newMessages
      })
    } else {
      dispatch({ type: TESTBOT_WITHFLOW_QUERY_ERROR })
    }
    return data
  } catch (err) {
    console.log('queryWithFlowTestbots error', err)
    dispatch({ type: TESTBOT_WITHFLOW_QUERY_ERROR })
  }

  return null
}
export const hideTestBot = () => async dispatch => {
  dispatch({ type: TESTBOT_HIDE })
}

export const showTestBot = () => async dispatch => {
  dispatch({ type: TESTBOT_SHOW })
}
