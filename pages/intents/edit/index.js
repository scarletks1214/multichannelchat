import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadIntent, updateIntent } from '../../../actions/intents'
import { silentLoadWorkspace } from '../../../actions/workspace'
import IntentsForm from '../../../components/intents/intents-form'
import Jumbotron from '../../../elements/jumbotron'
import { Loader } from '../../../components/global/loader'
import { addNotification as notify } from 'reapop'
import {
  compressJson,
  rawEntityJsonToEntities
} from '../../../utils/Converters'
import { Prompt } from 'react-router'

class IntentsEditPage extends Component {
  constructor(props) {
    super(props)
    this.navInfo = [
      { url: '/workspaces', title: this.props.workspace.name },
      { url: '/intents', title: 'Use Cases' }
    ]
    let workspaceEntities = rawEntityJsonToEntities(
      this.props.workspaceEntities
    )
    this.state = {
      intent: null,
      isLoading: true,
      workspaceEntities,
      formEdited: false
    }
  }

  componentDidMount() {
    this.loadIntent()
  }

  async loadIntent() {
    const { loadIntent, notify } = this.props
    try {
      let { intentId } = this.props.match.params
      let intent = await loadIntent(this.props.workspace, intentId)
      console.log('Parsed Intent: ', intent)
      this.setState({ intent })
    } catch (err) {
      console.log('Edit Intent Error', err)
      notify({
        title: `Error`,
        message: `Failed to load a intent - ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }

  async handleSubmit(intent, entities) {
    const { updateIntent, notify, silentLoadWorkspace } = this.props
    let { intentId } = this.props.match.params

    try {
      let response = await updateIntent(this.props.workspace, intentId, {
        intent: compressJson(intent),
        entities: entities
      })
      if (response.success) {
        this.setState({ formEdited: false })
        notify({
          title: `Success`,
          message: `Successfully saved intent`,
          status: 'success',
          position: 'tr',
          dismissible: true
        })
        // history.push(`/intents`)
        silentLoadWorkspace(true)
      } else {
        notify({
          title: `Error`,
          message: `Failed to update a intent`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
        console.log('Update Intent response', response)
      }
    } catch (err) {
      notify({
        title: `Error`,
        message: `Failed to update a intent - ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
      console.log('Update Intent Error', err)
    }
  }
  handleFormEdited() {
    this.setState({ formEdited: true })
  }
  render() {
    return (
      <div className="page intent-page edit-intent-page">
        <Jumbotron navInfo={this.navInfo} />
        {this.state.intent ? (
          <IntentsForm
            onSubmit={this.handleSubmit.bind(this)}
            intent={this.state.intent}
            workspaceEntities={this.state.workspaceEntities}
            handleFormEdited={this.handleFormEdited.bind(this)}
          />
        ) : (
          <div className="temporary-div" />
        )}
        <Loader loading={this.props.isLoading} text="loading..." fullPage />
        <Prompt
          when={this.state.formEdited}
          message="Intent edited but not saved. Are you sure you want to leave without save?"
        />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    workspace: state.workspace.workspace,
    intent: state.intent.intent,
    isLoading: state.intent.intentLoading,
    workspaceEntities: state.entity.entities
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadIntent,
      notify,
      updateIntent,
      silentLoadWorkspace
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(IntentsEditPage)
