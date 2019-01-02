import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div className="sc-header">
        <div className="agent-name"> {this.props.teamName}</div>
        <div className="status">Ready</div>
        <div className="action-buttons">
          {this.props.isOpen ? (
            <i className="material-icons" onClick={this.props.onClose}>
              remove
            </i>
          ) : (
            <i className="material-icons" onClick={this.props.onClose}>
              expand_less
            </i>
          )}
          <i className="material-icons" onClick={this.props.onRemove}>
            close
          </i>
        </div>
      </div>
    )
  }
}

export default Header
