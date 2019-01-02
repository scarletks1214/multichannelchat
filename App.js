import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ConnectedRouter } from 'react-router-redux'
import history from './history'
import NotificationsSystem from 'reapop'
// Todo Define styles via variable. not import whole module directly
import theme from './scss/reapop-theme-bootstrap'
//global css
import './css/main.css'

//structural elements
import LeftSidebar from './elements/left-sidebar'
import Navbar from './elements/navbar'
import TopNavigation from './elements/top-navigation'
import Backdrops from './elements/backdrops'
import ChatPopover from './components/chat-popover'
import Routes from './Routes'
import * as AuthManager from './utils/AuthManager'
import { logout } from './actions/authActions'
import './utils/consoleLog'
// import { FEATURE_CHAT_POPOVER } from './config/constants'
// import { setSideBarNavigation } from './actions/navbar'
const IDLE_TIMEOUT = 600
const CALL_INTERVAL = 20

class App extends Component {
  constructor(props) {
    super(props)
    this.idleSecondsCounter = 0
    this.resetTimer = this.resetTimer.bind(this)
    this.checkIdleTime = this.checkIdleTime.bind(this)
  }
  componentDidMount() {
    this.setup()
  }
  setup() {
    window.addEventListener('mousemove', this.resetTimer, false)
    window.addEventListener('mousedown', this.resetTimer, false)
    window.addEventListener('keypress', this.resetTimer, false)
    window.addEventListener('DOMMouseScroll', this.resetTimer, false)
    window.addEventListener('mousewheel', this.resetTimer, false)
    window.addEventListener('touchmove', this.resetTimer, false)
    window.addEventListener('MSPointerMove', this.resetTimer, false)
    this.startTimer()
  }

  startTimer() {
    // wait 2 seconds before calling goInactive
    window.setInterval(this.checkIdleTime, CALL_INTERVAL * 1000)
  }
  checkIdleTime() {
    this.idleSecondsCounter += CALL_INTERVAL
    if (this.idleSecondsCounter >= IDLE_TIMEOUT) {
      if (AuthManager.isAuthenticated()) {
        const { logout } = this.props
        logout()
      }
    }
  }
  resetTimer(e) {
    this.idleSecondsCounter = 0
  }
  render() {
    let {
      layout,
      background,
      navbar,
      topNavigation,
      logo,
      leftSidebar,
      collapsed
    } = this.props.config
    let { workspace, router } = this.props
    let isEmptyView = layout === 'empty-view-1' ? true : false
    let isWorkspaceView =
      router &&
      router.location &&
      router.location.pathname &&
      router.location.pathname.startsWith('/workspaces')
    return (
      <ConnectedRouter history={history}>
        <div
          data-layout={layout}
          data-background={background}
          data-navbar={navbar}
          data-top-navigation={topNavigation}
          data-logo={logo}
          data-left-sidebar={leftSidebar}
          data-collapsed={collapsed}>
          <NotificationsSystem theme={theme} />
          <Backdrops />
          <Navbar />
          <TopNavigation />
          <div className={isEmptyView ? '' : 'container-fluid'}>
            <div className={isEmptyView ? '' : 'row'}>
              <LeftSidebar history={history} />
              <div className="col main">
                <Routes />
              </div>
            </div>
          </div>
          {workspace && !isEmptyView && !isWorkspaceView && <ChatPopover />}
        </div>
      </ConnectedRouter>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.config,
    navigation: state.navigation,
    workspace: state.workspace.workspace,
    router: state.router
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(App)
