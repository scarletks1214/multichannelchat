import React from 'react'
import { translate } from 'react-i18next'
import { isDoc } from '../../utils'
import DropdownUser from './DropdownUser'
import Logo from '../logo'
import { IconForum, IconSupport } from '../../assets/icons/index'
import ToggleLayout from './ToggleLayout'

const Navbar = ({ t, currentUser }) => (
  <nav className="navbar navbar-1 d-flex justify-content-around align-items-center flex-nowrap">
    <Logo />
    <div
      className="nav-bar-message d-none d-lg-block"
      dangerouslySetInnerHTML={{ __html: t('welcome-creator-title') }}
    />
    <div className="separator" />

    {!isDoc() && (
      <ul className="nav nav-inline nav-inline-2">
        <li className="nav-item">
          <a className="nav-link forum">
            <IconForum />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link support">
            <IconSupport />
          </a>
        </li>
        <li className="nav-item nav-item-dropdown">
          <a className="nav-link nav-link-avatar">
            <div className="avatar-container">
              {currentUser && currentUser.firstName
                ? `${currentUser.firstName.charAt(
                    0
                  )}${currentUser.lastName.charAt(0)}`
                : ''}
            </div>
          </a>
          <DropdownUser />
        </li>
      </ul>
    )}
    <ToggleLayout />
  </nav>
)
export default translate('translations')(Navbar)
