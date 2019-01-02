import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { loadWorkspaces, deleteWorkspace } from '../../../actions/workspace'
import WorkspaceListSingleComponent from '../../../components/workspaces/WorkspaceListSingleComponent'
import { IconAdd } from '../../../assets/icons'
import Languages from '../../../json/languages'
import { setGlobalInfo } from '../../../actions/info'
import { translate } from 'react-i18next'
import * as WorkspaceManager from '../../../utils/WorkspaceManager'
import { Loader } from '../../../components/global/loader'
import DeleteConfirmModal from '../../../components/global/DeleteConfirmModal'
import { addNotification as notify } from 'reapop'

class WorkspaceListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: null,
      showDeleteModal: false,
      currentWorkspace: null
    }
  }
  componentDidMount() {
    let { workspaces, loadWorkspaces } = this.props
    if (!workspaces || workspaces.length === 0) {
      loadWorkspaces()
    }
  }

  handleWorkspaceSelect(workspace) {
    WorkspaceManager.setWorkspace(workspace.id)
    if (workspace.type === 'faqs') {
      this.props.history.push(`/faqs`)
    } else {
      this.props.history.push(`/intents`)
    }
  }

  async handleRemoveButtonClick(workspace) {
    this.setState({ showDeleteModal: true, currentWorkspace: workspace })
  }

  async handleRemoveWorkspace() {
    try {
      let { deleteWorkspace } = this.props
      let response = await deleteWorkspace(this.state.currentWorkspace)
      this.setState({ showDeleteModal: false, currentWorkspace: null })
      console.log('deleteWorkspace response', response)
      if (!response.success) {
        notify({
          title: `Error`,
          message: `Failed to delete workspace`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      } else {
        notify({
          title: `Success`,
          message: `Workspace successfully removed`,
          status: 'success',
          position: 'tr',
          dismissible: true
        })
      }
    } catch (err) {
      this.setState({ showDeleteModal: false, currentWorkspace: null })
      notify({
        title: `Error`,
        message: `Failed to delete workspace : ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  renderWorkspaces() {
    let workspaces = this.props.workspaces.filter(
      workspace =>
        !this.state.language || this.state.language.value === workspace.language
    )

    return (
      <div className="workspace-list mt-3">
        {workspaces.map((workspace, index) => (
          <WorkspaceListSingleComponent
            workspace={workspace}
            key={index}
            onClick={this.handleWorkspaceSelect.bind(this)}
            handleRemove={this.handleRemoveButtonClick.bind(this)}
          />
        ))}
      </div>
    )
  }

  renderHeader() {
    let { t } = this.props
    return (
      <div className="header">
        <div className="title">
          <h3>{t('workspaces').toUpperCase()}</h3>
        </div>
      </div>
    )
  }
  renderLanguageChoices() {
    let { workspaces } = this.props
    let self = this
    let languageMap = {}
    workspaces.forEach(workspace => {
      languageMap[workspace.language] = true
    })
    let languages = Languages.filter(language => languageMap[language.value])

    return (
      <div className="languages-tab">
        {languages.map(language => (
          <button
            key={language.value}
            data-info={language.value}
            className={
              'btn btn-info btn-rounded mr-2 mb-1 btn-sm language-tab ' +
              (this.state.language &&
              this.state.language.value === language.value
                ? ' selected-language-tab'
                : ' btn-outline')
            }
            onClick={() => {
              if (
                self.state.language &&
                self.state.language.value === language.value
              ) {
                self.setState({ language: null })
              } else {
                self.setState({ language: language })
              }
            }}>
            {language.label}
          </button>
        ))}
      </div>
    )
  }
  render() {
    return (
      <div className="page workspace-list-page">
        <div className="page-content">
          {this.renderHeader()}
          {this.renderLanguageChoices()}
          <div className="mt-4">
            <div className="workspace-component add-workspace" key="add">
              <Link to="/workspaces/new" className="plus-icon">
                <span className="new-workspace-label">Add Workspace</span>
                <IconAdd className="menu-icon add-workspace" />
              </Link>
            </div>
            {this.renderWorkspaces()}
          </div>
          {this.state.showDeleteModal && (
            <DeleteConfirmModal
              showModal={this.state.showDeleteModal}
              onCancel={() =>
                this.setState({
                  showDeleteModal: false,
                  currentWorkspace: null
                })
              }
              onDelete={this.handleRemoveWorkspace.bind(this)}
              info={this.state.currentWorkspace.name}
            />
          )}
          <Loader
            loading={this.props.isLoading}
            text="Requesting..."
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
    workspaces: state.workspace.workspaces,
    isLoading: state.workspace.workspaceLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWorkspaces,
      deleteWorkspace,
      setGlobalInfo,
      notify
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(WorkspaceListPage)
)
