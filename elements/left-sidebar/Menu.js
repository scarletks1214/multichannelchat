import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toggleNavigation } from '../../actions/navbar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Icons from '../../assets/icons'
import { translate } from 'react-i18next'
import * as WorkspaceManager from '../../utils/WorkspaceManager'
import { autoloadWorkspace } from '../../actions/workspace'
import { showTestBot } from '../../actions/testbot'
import { checkUnsavedIntent } from '../../utils/LocalDataManager'
class Menu extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    // this.state = {
    //   isOpen: false
    // }
  }
  handleAction(items) {
    const { showTestBot } = this.props
    if (items.action === 'test-workspace') {
      showTestBot()
    }
  }
  toggle() {
    const { items, history, toggleNavigation, autoloadWorkspace } = this.props
    console.log('HALA toggle here', items)
    if (
      items.static ||
      (!items.isOpen && !items.isMainMenu && items.url && items.url !== '')
    ) {
      if (items.url.startsWith('http')) {
        window.open(items.url, '_blank')
      } else {
        history.push(items.url)
      }
    }
    if (items.action) {
      this.handleAction(items)
      return
    }
    if (items.workspaceId) {
      let currentWorkspaceId = WorkspaceManager.getWorkspaceId()
      WorkspaceManager.setWorkspace(items.workspaceId)

      if (items.workspaceType === 'faqs') {
        if (
          history.location.pathname === '/faqs' &&
          items.workspaceId !== currentWorkspaceId
        ) {
          autoloadWorkspace(true)
        }
        history.push(`/faqs`)
      } else {
        if (
          history.location.pathname === '/intents' &&
          items.workspaceId !== currentWorkspaceId
        ) {
          autoloadWorkspace(true)
        }
        history.push(`/intents`)
      }
      return
    }
    toggleNavigation(this.props.navigation, items)
  }
  render() {
    let { t, items } = this.props
    let isOpen = !!items.isOpen
    let MenuIcon
    if (items.mainMenu) {
      MenuIcon = Icons[items.icon]
    }
    if (items.items.length === 0) {
      // let classForA = 'btn btn-default btn-flat btn-sidebar btn-sidebar-1'
      let classForA = 'btn-sidebar btn-sidebar-1'
      if (items.addtionalClass) {
        classForA += ' ' + items.addtionalClass
      }
      if (isOpen) {
        classForA += ' is-open'
      }
      if (!!items.mainMenu) {
        classForA += ' main-menu'
      }

      return (
        <li>
          <a
            // to={items.url}
            className={classForA}
            onClick={this.toggle}>
            {items.mainMenu && <MenuIcon className="menu-icon" />}
            <span className="title">
              {items.titleKey ? t(items.titleKey) : items.title}
            </span>
            {items.badge && (
              <span className={`ml-auto ${items.badge.className}`}>
                {items.badge.title}
              </span>
            )}
          </a>
        </li>
      )
    } else {
      let isMainMenu = !!items.mainMenu
      // let classForA = 'btn btn-default btn-flat btn-sidebar btn-sidebar-1 has-children'
      let classForA = 'btn-sidebar btn-sidebar-1 has-children'
      if (isOpen) {
        classForA += ' is-open'
      }
      if (isMainMenu) {
        classForA += ' main-menu'
      }
      if (items.addtionalClass) {
        classForA += ' ' + items.addtionalClass
      }
      return (
        <li className={isMainMenu ? 'main-menu' : ''}>
          <div className={'linkContainer ' + (items.addtionalClass || '')}>
            <a className={classForA} onClick={this.toggle}>
              {/* <i className="material-icons">{items.icon}</i> */}
              {items.mainMenu && <MenuIcon className="menu-icon" />}
              {/* <span className="title">{items.titleKey ? t(items.titleKey) : items.title}</span> */}
              <span className="title">
                {items.title ? items.title : t(items.titleKey)}
              </span>
              {items.slug === 'intents' &&
                checkUnsavedIntent(this.props.workspace.id, 'new') && (
                  <button
                    type="button"
                    className="btn btn-info btn-rounded btn-outline btn-unsaved-nav">
                    {t('unsaved')}
                  </button>
                )}
            </a>
            <Link to={`${items.url}/new`} className="plus-icon">
              <i className="material-icons">add</i>
            </Link>
          </div>

          <ul className={isOpen ? 'list-unstyled is-open' : 'list-unstyled'}>
            {items.items.map((item, k) => (
              <ConnectedMenu
                key={k}
                items={item}
                history={this.props.history}
              />
            ))}
          </ul>
        </li>
      )
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    workspace: state.workspace.workspace,
    navigation: state.navigation
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleNavigation,
      autoloadWorkspace,
      showTestBot
    },
    dispatch
  )
let ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(Menu)
)
export default ConnectedMenu
// export default Menu
