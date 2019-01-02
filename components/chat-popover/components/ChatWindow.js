import React, { Component } from 'react'
import Header from './Header'
import { Loader, LoadingOverlay } from '../../../components/global/loader'
import ConversationPanel from './ConversationPanel'
import ResponsePanel from './ResponsePanel'
import { translate } from 'react-i18next'

class ChatWindow extends Component {
  onUserInputSubmit(message) {
    this.props.onUserInputSubmit(message)
  }

  onMessageReceived(message) {
    this.setState({ messages: [...this.state.messages, message] })
  }

  render() {
    let { response, t } = this.props
    let classList = [
      'sc-chat-window',
      this.props.isOpen ? 'opened' : 'closed',
      this.props.workspace.withFlow ? 'conversation' : 'response'
    ]
    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={this.props.agentProfile.teamName}
          onClose={this.props.onClose}
          isOpen={this.props.isOpen}
          onRemove={this.props.onRemove}
        />
        <LoadingOverlay className="chat-content-wrapper">
          {this.props.isOpen &&
            this.props.workspace.withFlow && (
              <ConversationPanel
                onUserInputSubmit={this.onUserInputSubmit.bind(this)}
                response={response}
                showDiagnostics={this.props.showDiagnostics}
              />
            )}
          {this.props.isOpen &&
            !this.props.workspace.withFlow && (
              <ResponsePanel
                onUserInputSubmit={this.onUserInputSubmit.bind(this)}
                response={response}
                showDiagnostics={this.props.showDiagnostics}
              />
            )}
          <Loader loading={this.props.isLoading} text={t('querying')} />
        </LoadingOverlay>
      </div>
    )
  }
}
export default translate('translations')(ChatWindow)
