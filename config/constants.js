export const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
export const GOOGLE_RECAPTCHA_KEY = process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY
export const APP_TYPE = process.env.REACT_APP_TYPE
  ? process.env.REACT_APP_TYPE
  : 'front'
console.log(
  'Process Env',
  process.env.REACT_APP_USE_WORKSPACE_SERVER,
  !!process.env.REACT_APP_USE_WORKSPACE_SERVER,
  !process.env.REACT_APP_USE_WORKSPACE_SERVER
)
export const FEATURE_CHAT_POPOVER = !!process.env.REACT_APP_FEATURE_CHAT_POPOVER
export const USE_WORKSPACE_SERVER = !!process.env.REACT_APP_USE_WORKSPACE_SERVER
export const WORKSPACE_TYPES = process.env.REACT_APP_PROJECT_TYPES
export const API_VERSION_1_1 = '1.1'
export const API_VERSION_2_0 = '2.0'
export const DOC_URL =
  process.env.REACT_APP_DOC_URL || 'https://docs.triniti.ai'
