import React, { Component } from 'react'
import TextMessage from './TextMessage'
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
                this.props.onDetailClick(this.props.message.data.info)
              }>
              <i className="fa fa-info" />
            </div>
            <TextMessage {...this.props.message} />
          </div>
        </div>
      </div>
    )
  }
}

export default Message
