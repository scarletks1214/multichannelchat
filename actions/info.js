import { SET_GLOBAL_INFORMATION } from '../actionTypes'

export const setGlobalInfo = info => async dispatch => {
  dispatch({ type: SET_GLOBAL_INFORMATION, info })
}
