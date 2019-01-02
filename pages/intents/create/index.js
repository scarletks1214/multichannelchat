import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import { translate } from 'react-i18next'
import IntentsForm from '../../../components/intents/intents-form'
import Jumbotron from '../../../elements/jumbotron'
import { createIntent } from '../../../actions/intents'
import {
  silentLoadWorkspace,
  autoloadWorkspace
} from '../../../actions/workspace'

import { compressJson } from '../../../utils/Converters'
import { Loader } from '../../../components/global/loader'
import { Prompt } from 'react-router'
import {
  setUnsavedIntent,
  getUnsavedIntent,
  clearUnsavedIntent
} from '../../../utils/LocalDataManager'

class IntentsCreatePage extends Component {
  constructor(props) {
    super(props)
    const { t } = this.props
    this.navInfo = [
      { url: '/workspaces', title: this.props.workspace.name },
      { url: '/intents', title: t('use-cases') }
    ]
    this.state = {
      intent: {},
      formEdited: false
    }
    this.unsavedIntent = this.getUnsavedIntent()
  }

  async handleSubmit(intent, entities) {
    const { createIntent, history, notify } = this.props
    console.log('Create Intent - handleSubmit', intent, entities)
    try {
      let response = await createIntent(this.props.workspace, {
        intent: compressJson(intent),
        entities: entities
      })
      if (response.success) {
        this.setState({ formEdited: false })
        clearUnsavedIntent(this.props.workspace.id, 'new')
        let newIntentId = response.response.intent.id
        await autoloadWorkspace(true)
        history.push(`/intents/${newIntentId}`)
      } else {
        this.handleSaveToLocal(intent)
        notify({
          title: `Error`,
          message: `Failed to create a intent`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
        console.log('Create Intent response', response)
      }
    } catch (err) {
      this.handleSaveToLocal(intent)
      notify({
        title: `Error`,
        message: `Failed to create a intent - ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
      console.log('Create Intent Error', err)
    }
  }
  handleFormEdited() {
    if (!this.state.formEdited) {
      this.setState({ formEdited: true })
    }
  }

  handleSaveToLocal(intent) {
    if (
      setUnsavedIntent(this.props.workspace.id, 'new', JSON.stringify(intent))
    ) {
      this.setState({ formEdited: false })
    }
  }
  getUnsavedIntent() {
    try {
      let intent = getUnsavedIntent(this.props.workspace.id, 'new')
      if (intent) {
        return JSON.parse(intent)
      }
    } catch (err) {
      console.log('getUnsavedIntent Error', err)
    }
    return null
  }
  render() {
    return (
      <div className="page intent-page create-intent-page">
        <Jumbotron navInfo={this.navInfo} />
        <IntentsForm
          onSubmit={this.handleSubmit.bind(this)}
          handleFormEdited={this.handleFormEdited.bind(this)}
          saveToLocal={this.handleSaveToLocal.bind(this)}
          intent={this.unsavedIntent}
        />
        <Loader loading={this.props.isLoading} text="Creating..." fullPage />
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
    isLoading: state.intent.intentLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createIntent,
      notify,
      silentLoadWorkspace,
      autoloadWorkspace
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(IntentsCreatePage)
)
