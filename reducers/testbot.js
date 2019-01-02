import {
  TESTBOT_QUERY_REQUEST,
  TESTBOT_QUERY_SUCCESS,
  TESTBOT_QUERY_ERROR,
  WORKSPACES_AUTO_LOAD_REQUEST,
  TESTBOT_SHOW,
  TESTBOT_HIDE,
  TESTBOT_WITHFLOW_QUERY_REQUEST,
  TESTBOT_WITHFLOW_QUERY_SUCCESS,
  TESTBOT_WITHFLOW_QUERY_ERROR
} from '../actionTypes'

const data = {
  response: null,
  messages: [],
  testbotLoading: false,
  testbotShown: true
}
export function testbot(state = data, action) {
  let messages
  switch (action.type) {
    case TESTBOT_QUERY_REQUEST:
      return Object.assign({}, state, {
        response: null,
        testbotLoading: true
      })
    case TESTBOT_QUERY_SUCCESS:
      return Object.assign({}, state, {
        testbotLoading: false,
        response: action.data
      })
    case TESTBOT_WITHFLOW_QUERY_REQUEST:
      messages = [...state.messages, action.data]
      return Object.assign({}, state, {
        messages: messages,
        testbotLoading: true
      })
    case TESTBOT_WITHFLOW_QUERY_SUCCESS:
      messages = [...state.messages, ...action.data]
      return Object.assign({}, state, {
        testbotLoading: false,
        messages: messages
      })
    case TESTBOT_SHOW:
      return Object.assign({}, state, {
        testbotShown: true
      })
    case TESTBOT_HIDE:
      return Object.assign({}, state, {
        testbotShown: false
      })
    case TESTBOT_QUERY_ERROR:
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return Object.assign({}, state, {
        response: null,
        testbotLoading: false
      })
    case TESTBOT_WITHFLOW_QUERY_ERROR:
      return Object.assign({}, state, {
        testbotLoading: false
      })
    default:
      return state
  }
}
