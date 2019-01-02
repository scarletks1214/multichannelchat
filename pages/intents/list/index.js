import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Jumbotron from '../../../elements/jumbotron'
import { silentLoadWorkspace } from '../../../actions/workspace'
import { deleteIntent } from '../../../actions/intents'
import IntentListSingleComponent from '../../../components/intents/IntentListSingleComponent'
import DeleteConfirmModal from '../../../components/global/DeleteConfirmModal'
import { Loader } from '../../../components/global/loader'
import { addNotification as notify } from 'reapop'

class IntentsListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteModal: false,
      currentIntent: null,
      loadMessage: 'loading...'
    }
  }

  handleIntentClick(intent) {
    this.props.history.push(`/intents/${intent.id}`)
  }
  handleRemoveClick(intent) {
    this.setState({
      showDeleteModal: true,
      currentIntent: intent,
      loadMessage: null
    })
  }

  async handleRemoveIntent() {
    try {
      let { deleteIntent, silentLoadWorkspace } = this.props
      let response = await deleteIntent(
        this.props.workspace,
        this.state.currentIntent
      )
      this.setState({
        showDeleteModal: false,
        currentWocurrentIntentrkspace: null,
        loadMessage: null
      })
      if (!response.success) {
        notify({
          title: `Error`,
          message: `Failed to delete intent`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      } else {
        silentLoadWorkspace(true)
      }
    } catch (err) {
      this.setState({
        showDeleteModal: false,
        currentIntent: null,
        loadMessage: null
      })
      notify({
        title: `Error`,
        message: `Failed to delete intent : ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  renderIntents() {
    if (!this.props.workspace.intents) {
      return
    }
    let intents = this.props.workspace.intents
    let keys = Object.keys(intents)
    return (
      <div className="intents-list mt-3">
        <div className="add-intent  mb-3" key="add">
          <Link
            to="/intents/new"
            className="add-intent-btn btn btn-info btn-rounded btn-outline">
            <span className="title">Add new intent</span>
            <i className="ion-icon ion-icon-2x ion-ios-plus-empty add-new-utterance" />
          </Link>
        </div>
        {keys.map(intentId => (
          <IntentListSingleComponent
            intent={intents[intentId]}
            key={intentId}
            handleIntentClick={this.handleIntentClick.bind(this)}
            handleRemoveClick={this.handleRemoveClick.bind(this)}
          />
        ))}
      </div>
    )
  }

  render() {
    let navInfo = [{ url: '', title: this.props.workspace.name }]
    return (
      <div className="page intent-list-page">
        <Jumbotron navInfo={navInfo} />
        <div className="page-content">
          <div className="header">
            <h3>INTENTS</h3>
          </div>
          {this.renderIntents()}
          {this.state.showDeleteModal && (
            <DeleteConfirmModal
              showModal={this.state.showDeleteModal}
              onCancel={() =>
                this.setState({
                  showDeleteModal: false,
                  currentIntent: null
                })
              }
              onDelete={this.handleRemoveIntent.bind(this)}
              info={this.state.currentIntent.name}
            />
          )}
          <Loader
            loading={this.props.isLoading || this.props.isIntentLoading}
            text={this.state.loadMessage || 'loading...'}
            fullPage
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    workspace: state.workspace.workspace,
    isLoading: state.workspace.workspaceLoading,
    isIntentLoading: state.intent.intentLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      silentLoadWorkspace,
      notify,
      deleteIntent
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(IntentsListPage)
