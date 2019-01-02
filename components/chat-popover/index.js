import React, { Component } from 'react'
import ChatWindow from './components/ChatWindow'
import { queryTestbots, hideTestBot } from '../../actions/testbot'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import DiagnosticsModal from './components/DiagnosticsModal'

class ChatPopoverWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: null,
      isOpen: false,
      agentProfile: {
        teamName: 'Test Workspace'
      },
      dianogsticsOpen: false,
      dianogsticsContent: null
    }
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  async onMessageWasSent(message) {
    // TODO: MAKE API CALLS HERE
    const { workspace, queryTestbots } = this.props
    let response = await queryTestbots(workspace, message)
    console.log('queryTestbots response', response)
  }

  render() {
    if (!this.props.testbotShown) {
      return false
    }
    return (
      <div className="chat-popover-agent">
        <ChatWindow
          // response={this.props.testbotResponse}
          onUserInputSubmit={this.onMessageWasSent.bind(this)}
          agentProfile={this.state.agentProfile}
          isOpen={this.state.isOpen}
          onClose={this.handleClick.bind(this)}
          isLoading={this.props.isLoading}
          showDiagnostics={content =>
            this.setState({
              dianogsticsOpen: true,
              dianogsticsContent: content
            })
          }
          onRemove={this.props.hideTestBot}
          workspace={this.props.workspace}
        />
        {this.state.dianogsticsOpen && (
          <DiagnosticsModal
            isOpen={this.state.dianogsticsOpen}
            closeModal={() => this.setState({ dianogsticsOpen: false })}
            content={this.state.dianogsticsContent}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    workspace: state.workspace.workspace,
    // testbotResponse: state.testbot.response,
    isLoading: state.testbot.testbotLoading,
    testbotShown: state.testbot.testbotShown
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryTestbots,
      notify,
      hideTestBot
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ChatPopoverWidget)
