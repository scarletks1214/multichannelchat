import React, { Component } from 'react'
import ConversationList from './ConversationList'
import ConversationUserInput from './ConversationUserInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import { queryWithFlowTestbots } from '../../../actions/testbot'

class ConversationPanel extends Component {
  async onUserInputSubmit(message) {
    const { workspace, queryWithFlowTestbots } = this.props
    let response = await queryWithFlowTestbots(workspace, message)
    console.log('queryTestbots response', response)
  }

  render() {
    const { messages, showDiagnostics } = this.props
    return (
      <div className="conversation-panel">
        <ConversationList
          messages={messages}
          showDiagnostics={showDiagnostics}
        />
        <ConversationUserInput onSubmit={this.onUserInputSubmit.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.testbot.messages
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryWithFlowTestbots,
      notify
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPanel)
