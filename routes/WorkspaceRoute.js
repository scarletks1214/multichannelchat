import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { autoloadWorkspace, loadWorkspaces } from '../actions/workspace'
import AuthorizedRoute from './AuthorizedRoute'
import * as WorkspaceManager from '../utils/WorkspaceManager'

class WorkspaceRoute extends React.Component {
  componentDidMount() {
    const {
      workspace,
      autoloadWorkspace,
      workspaces,
      loadWorkspaces
    } = this.props
    if (
      !workspace ||
      (WorkspaceManager.isWorkspaceSet() &&
        workspace.id !== WorkspaceManager.getWorkspaceId())
    ) {
      autoloadWorkspace(true)
    }
    if (!workspaces || workspaces.length === 0) {
      loadWorkspaces()
    }
  }

  render() {
    const {
      centerComponent: Component,
      workspace,
      autoloadingWorkspace,
      ...rest
    } = this.props
    return (
      <Route
        {...rest}
        render={props => {
          if (autoloadingWorkspace) {
            return <div>Loading....</div>
          }
          return workspace ? (
            <Component {...props} />
          ) : (
            <Redirect to="/workspaces" />
          )
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  workspace: state.workspace.workspace,
  workspaces: state.workspace.workspaces,
  autoloadingWorkspace: state.workspace.autoLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      autoloadWorkspace,
      loadWorkspaces
    },
    dispatch
  )

let connectedWorkspace = connect(mapStateToProps, mapDispatchToProps)(
  WorkspaceRoute
)

export default ({ component, ...rest }) => (
  <AuthorizedRoute
    {...rest}
    component={connectedWorkspace}
    centerComponent={component}
  />
)
