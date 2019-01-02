import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { addNotification as notify } from 'reapop'
import { logout } from '../../actions/authActions'
// import { logout as logoutApi } from '../../utils/ApiManager'
import { Link } from 'react-router-dom'

const DropdownUser = ({ items }) => (
  <div className="navbar-dropdown dropdown-user">
    {items.map((item, i) => (
      <div
        className={`dropdown-item ${item.className}`}
        key={i}
        onClick={event => {
          item.onClick && item.onClick(event)
        }}>
        {item.url ? (
          <Link to={item.url}>{item.name}</Link>
        ) : (
          <span className="title">{item.name}</span>
        )}
      </div>
    ))}
  </div>
)

class DropdownUserComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          icon: 'sli-settings',
          iconColor: 'default',
          name: 'Profile',
          badge: false,
          badgeText: false,
          badgeClass: false,
          className: '',
          url: '/profile'
        },
        {
          icon: 'sli-settings',
          iconColor: 'default',
          name: 'Manage Payments',
          badge: false,
          badgeText: false,
          className: 'middle-item',
          url: '/manage-payments',
          badgeClass: false
        },
        {
          icon: 'sli-power',
          iconColor: 'default',
          name: 'Logout',
          badge: false,
          className: '',
          badgeText: false,
          badgeClass: false,
          onClick: this.handleLogout.bind(this)
        }
      ]
    }
  }

  async handleLogout() {
    console.log('handleLogout')
    const { logout, notify } = this.props
    try {
      let response = await logout()
      if (!response || !response.success) {
        throw new Error(
          `Logout Failed: ${response.msg ||
            response.statusMsg ||
            'Server Error'}`
        )
      }
    } catch (err) {
      notify({
        title: `Error`,
        message: `${err.message}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  handleProfile() {
    console.log('handleProfile')
  }

  render() {
    let { items } = this.state
    return <DropdownUser items={items} />
  }
}
const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify,
      logout
    },
    dispatch
  )

export default translate('translations')(
  connect(mapStateToProps, mapDispatchToProps)(DropdownUserComponent)
)
