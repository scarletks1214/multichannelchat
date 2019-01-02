import React, { Component } from 'react'
import ConversationMessage from './Messages/ConversationMessage'
import { translate } from 'react-i18next'

class ConversationList extends Component {
  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight
  }

  render() {
    const { t } = this.props
    let noResonse = !this.props.messages || this.props.messages.length === 0
    return (
      <div
        className={'sc-message-list' + (noResonse ? ' no-response' : '')}
        ref={el => (this.scrollList = el)}>
        {this.props.messages && this.props.messages.length > 0 ? (
          this.props.messages.map((message, i) => {
            return (
              <ConversationMessage
                message={message}
                key={i}
                onDetailClick={this.props.showDiagnostics}
              />
            )
          })
        ) : (
          <span className="placeholder-message">
            {t('test-your-bot-message')}
          </span>
        )}
      </div>
    )
  }
}

export default translate('translations')(ConversationList)
