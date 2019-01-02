import React, { Component } from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import { translate } from 'react-i18next'
import { queryTestbots } from '../../../actions/testbot'

class ResponsePanel extends Component {
  async onUserInputSubmit(message) {
    const { workspace, queryTestbots } = this.props
    let response = await queryTestbots(workspace, message)
    console.log('queryTestbots response', response)
  }

  render() {
    const { response, showDiagnostics, t } = this.props
    return (
      <div className="response-panel">
        <UserInput onSubmit={this.onUserInputSubmit.bind(this)} />
        <MessageList response={response} />
        {response && (
          <div className="sc-footer">
            <button
              className="btn btn-primary btn-rounded"
              onClick={() => showDiagnostics(response)}>
              {t('diagnostics')}
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    testbotResponse: state.testbot.response
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryTestbots,
      notify
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(ResponsePanel)
)
