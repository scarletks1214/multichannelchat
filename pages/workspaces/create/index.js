import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import WorkspaceForm from '../../../components/workspaces/WorkspaceForm'
import { translate } from 'react-i18next'
import { Loader } from '../../../components/global/loader'
import { createWorkspace } from '../../../actions/workspace'
import { Prompt } from 'react-router'

class WorkspaceCreatePage extends Component {
  constructor(props) {
    super(props)
    const { t } = this.props
    this.navInfo = [{ url: '', title: t('create-new-workspace') }]
    this.state = {
      formEdited: false
    }
  }

  async handleSubmit(data) {
    try {
      let { createWorkspace, history, notify } = this.props
      let response = await createWorkspace(data)
      if (response.success) {
        this.setState({ formEdited: false })
        history.push(`/workspaces`)
      } else {
        notify({
          title: `Error`,
          message: `Failed to create a workspace`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      }
      console.log('Create Workspace', response)
    } catch (err) {
      console.log('Workspace Create Submission Error', err)
    }
  }
  renderHeader() {
    let { t } = this.props
    return (
      <div className="header">
        <div className="title">
          <h3>{t('create-new-workspace')}</h3>
        </div>
      </div>
    )
  }
  handleFormEdited() {
    this.setState({ formEdited: true })
  }
  render() {
    const { t } = this.props
    return (
      <div className="page workspace-page create-workspace-page">
        <div className="page-content">
          {this.renderHeader()}
          <WorkspaceForm
            onSubmit={this.handleSubmit.bind(this)}
            handleFormEdited={this.handleFormEdited.bind(this)}
          />
          <Loader
            loading={this.props.isLoading}
            text={t('creating')}
            fullPage
          />
        </div>
        <Prompt
          when={this.state.formEdited}
          message="Workspace edited but not saved. Are you sure you want to leave without save?"
        />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.workspace.workspaceLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createWorkspace,
      notify
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(WorkspaceCreatePage)
)
