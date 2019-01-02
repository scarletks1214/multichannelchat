import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { autoLogin } from '../actions/authActions'
import { isWorkspaceSet } from '../utils/WorkspaceManager'

class UnauthorizedRoute extends React.Component {
  componentWillMount() {
    const { currentUser, autoLogin } = this.props
    if (!currentUser) {
      autoLogin()
    }
  }

  render() {
    const {
      component: Component,
      currentUser,
      autoLoggingIn,
      ...rest
    } = this.props

    return (
      <Route
        {...rest}
        render={props => {
          if (autoLoggingIn) {
            return <div>Loading....</div>
          }
          return !currentUser ? (
            <Component {...props} />
          ) : isWorkspaceSet() ? (
            <Redirect to="/intents" />
          ) : (
            <Redirect to="/dashboard" />
          )
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  autoLoggingIn: state.auth.autoLoggingIn
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      autoLogin
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(UnauthorizedRoute)
