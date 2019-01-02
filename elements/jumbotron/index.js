import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Jumbotron extends Component {
  render() {
    const { navInfo } = this.props
    let breadcrumbs = navInfo.map((nav, index) => (
      <li className="" key={index}>
        {nav.url ? <Link to={nav.url}>{nav.title}</Link> : nav.title}
      </li>
    ))
    return (
      <div>
        <div className="container-fluid">
          <div className="row justify-content-between">
            <ol className="breadcrumb transparent icon-line-right">
              {breadcrumbs}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Jumbotron
