export function setConfig(key, value) {
  let config = {
    [key]: value
  }
  return {
    type: 'SET_CONFIG',
    config
  }
}
// export function setLayout(layout) {
//   return {
//     type: 'SET_LAYOUT',
//     layout
//   }
// }
export const setLayout = layout => async dispatch => {
  dispatch({ type: 'SET_LAYOUT', layout })
}
