import { SET_GLOBAL_INFORMATION } from '../actionTypes'
import CountryCodes from '../json/country-codes.json'
import { PROJECT_TYPE_MAP } from '../config/info'
import { WORKSPACE_TYPES } from '../config/constants'

function populateProjectType() {
  let projectTypes = []
  if (WORKSPACE_TYPES) {
    let types = WORKSPACE_TYPES.split(',')
    types.forEach(type => {
      if (PROJECT_TYPE_MAP[type]) {
        projectTypes.push(PROJECT_TYPE_MAP[type])
      }
    })
  } else {
    projectTypes.push(...Object.values(PROJECT_TYPE_MAP))
  }
  return projectTypes
}
const initialInfo = {
  language: 'en',
  projectTypes: populateProjectType(),
  countries: CountryCodes
}

export function info(state = initialInfo, action) {
  switch (action.type) {
    case SET_GLOBAL_INFORMATION:
      return Object.assign({}, state, {
        ...action.info
      })
    default:
      return state
  }
}
