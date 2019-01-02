import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'reapop'
import { config } from './config'
import { navigation } from './navigation'
import { workspace } from './workspace'
import { entity } from './entity'
import { faq } from './faq'
import { smalltalks } from './smalltalk'
import { intent } from './intent'
import { auth } from './auth'
import { info } from './info'
import { testbot } from './testbot'
import { deploy } from './deploy'
import { channel } from './channel'

const rootReducer = combineReducers({
  config,
  navigation,
  workspace,
  entity,
  faq,
  smalltalks,
  intent,
  auth,
  info,
  testbot,
  deploy,
  channel,
  router: routerReducer,
  notifications: notificationsReducer()
})
export default rootReducer
