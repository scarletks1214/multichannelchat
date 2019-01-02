import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import Toggle from 'react-toggle'
import { translate } from 'react-i18next'
import TitleEditor from '../global/TitleEditor'
import Select from 'react-select'
import LanguageOptions from '../../json/languages.json'
// import TimezoneOptions from '../../json/timezones.json'
import ProjectTypeComponent from './ProjectTypeComponent'
// import { workspaceToJSON } from '../../utils/Converters'
import 'react-toggle/style.css'

class WorkspaceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workspace: {
        name: '',
        language: 'en',
        country: 'us',
        type: '',
        withFlow: false
      },
      disabled: false,
      searchable: true,
      clearable: true
    }
  }

  handleWorkspaceChange = (name, value) => {
    let workspace = this.state.workspace
    workspace[name] = value
    this.setState({ workspace, errors: [] })
    this.props.handleFormEdited()
  }

  handleNameChange = event => {
    let workspace = this.state.workspace
    workspace.name = event.target.value
    this.setState({ workspace, errors: [] })
    this.props.handleFormEdited()
  }

  validateSave() {
    const { t } = this.props
    let errMessage
    if (this.state.workspace.name === '') {
      errMessage = t('name-is-required')
    }
    if (this.state.workspace.type === '') {
      errMessage = t('project-type-is-required')
    }
    if (!this.state.workspace.country) {
      errMessage = t('country-is-required')
    }
    if (!this.state.workspace.language) {
      errMessage = t('language-is-required')
    }
    if (errMessage) {
      this.props.notify({
        title: t('something-went-wrong'),
        message: `${errMessage}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
      return false
    }
    return true
  }

  handleSave(event) {
    if (!this.validateSave()) {
      return
    }
    let workspaceJSON = this.state.workspace // workspaceToJSON(this.state.workspace)
    console.log('workspace JSON', workspaceJSON)
    this.props.onSubmit(workspaceJSON)
  }

  renderHeader() {
    const { t } = this.props
    return (
      <div className="header">
        <TitleEditor
          name={this.state.workspace.name}
          placeholder={t('workspace-name')}
          handleChange={this.handleNameChange.bind(this)}
        />
      </div>
    )
  }
  renderProjectTypes() {
    return this.props.projectTypes.map((projectType, index) => (
      <ProjectTypeComponent
        projectType={projectType}
        className=""
        key={index}
        isSelected={projectType.value === this.state.workspace.type}
        onClick={() => this.handleWorkspaceChange('type', projectType.value)}
      />
    ))
  }
  handleWithFlowToogle(event, val) {
    console.log('handleWithFlowToogle ', event, val)
    let workspace = this.state.workspace
    workspace.withFlow = event.target.checked
    this.setState({ workspace })
  }
  render() {
    const { t } = this.props
    return (
      <div className="page-content">
        {this.renderHeader()}
        <form onSubmit={e => e.preventDefault()} className="workspace-form">
          <div className="section row">
            <div className="language-selector-container selector-container col-6">
              <label className="text-uppercase">{t('default-language')}</label>
              <Select
                autosize={false}
                placeholder={t('select-default-language')}
                autofocus
                options={LanguageOptions}
                simpleValue
                clearable={this.state.clearable}
                name="language-selector"
                disabled={this.state.disabled}
                value={this.state.workspace.language}
                onChange={value =>
                  this.handleWorkspaceChange('language', value)
                }
                searchable={this.state.searchable}
                className="custom-react-selector-theme"
              />
            </div>
            <div className="country-selector-container selector-container col-6">
              <label className="text-uppercase">{t('default-country')}</label>
              <Select
                autosize={false}
                placeholder={t('select-default-country')}
                autofocus
                options={this.props.countries}
                simpleValue
                clearable={this.state.clearable}
                name="language-selector"
                disabled={this.state.disabled}
                value={this.state.workspace.country}
                onChange={value => this.handleWorkspaceChange('country', value)}
                searchable={this.state.searchable}
                className="custom-react-selector-theme"
              />
            </div>
          </div>
          <div className="with-flow-container">
            <label className="toggle-container">
              <Toggle
                checked={this.state.workspace.withFlow}
                icons={false}
                onChange={this.handleWithFlowToogle.bind(this)}
              />
              <span className="label-text text-uppercase">
                {t('with-flow')}
              </span>
            </label>
          </div>
          <div className="section">
            <div className="project-type-container selector-container ">
              <label className="text-uppercase">{t('project-type')}</label>
              <div className="project-types mt-4">
                {this.renderProjectTypes()}
              </div>
            </div>
          </div>
          <div className="buttons text-right pr-5 mb-3">
            <button
              className={
                'btn btn-dark pr-5 pl-5 btn-rounded btn-save text-uppercase'
              }
              onClick={this.handleSave.bind(this)}>
              {t('create')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    projectTypes: state.info.projectTypes,
    countries: state.info.countries
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(WorkspaceForm)
)
// export default Menu
