import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { updateNavBarWithWorkspaces } from '../../actions/navbar'
import { setLayout } from '../../actions/config'
import Menu from './Menu'
import DeployComponent from './DeployComponent'
import SidebarFooter from './SidebarFooter'

const layouts = ['default-sidebar', 'collapsed-sidebar-1']

class LeftSideBar extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.workspaces !== nextProps.workspaces) {
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.workspaces !== nextProps.workspaces) {
      this.props.updateNavBarWithWorkspaces(nextProps.workspaces)
      return false
    }
    return true
  }
  shouldShowMenu(items, workspace) {
    const { testbotShown } = this.props
    if (items.workspaceMenu && !workspace) {
      // If workspace Menu true and no workspace selected, false
      return false
    }
    if (workspace) {
      if (items.notForTypes && items.notForTypes.includes(workspace.type)) {
        return false
      }
      if (items.forTypes && !items.forTypes.includes(workspace.type)) {
        return false
      }
      if (items.withFlowMenu && !workspace.withFlow) {
        return false
      }
      if (items.action === 'test-workspace' && testbotShown) {
        return false
      }
    }
    return true
  }
  onClickCollapseExpand() {
    const { layout, setLayout } = this.props
    if (layout === 'default-sidebar') {
      setLayout('collapsed-sidebar-1')
    } else {
      setLayout('default-sidebar')
    }
  }
  render() {
    const { navigation, layout, history, workspace } = this.props
    if (!layouts.includes(layout)) {
      return <div />
    }
    return (
      <div>
        <div className="left-sidebar-placeholder" />
        <div className="left-sidebar left-sidebar-1">
          <div className="wrapper">
            <div className="content">
              {navigation.map((menu, i) => (
                <div key={i} className="section">
                  <ul className="list-unstyled">
                    {menu.items.map((items, i) => {
                      if (this.shouldShowMenu(items, workspace)) {
                        return <Menu key={i} items={items} history={history} />
                      }
                      return ''
                    })}
                  </ul>
                </div>
              ))}
              {workspace && <DeployComponent />}
            </div>
            <SidebarFooter
              onClickCollapseExpand={this.onClickCollapseExpand.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigation: state.navigation,
    layout: state.config.layout,
    workspace: state.workspace.workspace,
    workspaces: state.workspace.workspaces,
    testbotShown: state.testbot.testbotShown
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNavBarWithWorkspaces, setLayout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(LeftSideBar)
)
