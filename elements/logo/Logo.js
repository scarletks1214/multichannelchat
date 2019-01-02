import React from 'react'
import {Link} from 'react-router-dom'
import IconLogo from '../../assets/icons/IconLogo.svg';

const Logo = () => (
  <Link
    to="/"
    className="logo d-flex justify-content-start align-items-center flex-nowrap">
    <img src={IconLogo} alt="Triniti" className="icon-logo"/>
  </Link>
)

export default Logo
