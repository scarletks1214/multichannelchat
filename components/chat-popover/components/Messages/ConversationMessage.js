import React, { Component } from 'react'

class Message extends Component {
  render() {
    const author = this.props.message.author === 'me' ? 'sent' : 'received'
    const contentClassList = ['sc-message--content', author]

    return (
      <div>
        <div className="sc-message">
          <div className={contentClassList.join(' ')}>
            <div
              className="sc-message--avatar"
              onClick={() =>
                this.props.onDetailClick(this.props.message.originalData)
              }>
              <i className="fa fa-info" />
            </div>
            <div className="sc-message--text">{this.props.message.message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Message
