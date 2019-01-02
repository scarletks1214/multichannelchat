import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import UtterancesContainer from './UtterancesContainer'
import { addNotification as notify } from 'reapop'
import TitleEditor from '../../global/TitleEditor'
import UtteranceEditor from '../../utterances/UtteranceEditor'
import SaveButton from '../../global/SaveButton'
import moment from 'moment'
import {
  validateWithRegEx,
  NAME_VALIDATION_REGEX
} from '../../../utils/Validations'

class IntentsForm extends Component {
  constructor(props) {
    super(props)
    this.utteranceKeyCounter = 1
    let originalIntent = {}
    if (this.props.intent) {
      originalIntent = this.convertFromJSON(this.props.intent)
    }
    let workspaceEntities = []
    if (this.props.workspaceEntities) {
      workspaceEntities = [...this.props.workspaceEntities]
    }
    let workspaceEntityNames = workspaceEntities.map(
      workspaceEntity => workspaceEntity.name
    )
    if (originalIntent.entities) {
      originalIntent.entities.forEach(entity => {
        if (!workspaceEntityNames.includes(entity.name)) {
          workspaceEntities.push({ name: entity.name, values: [] })
        }
      })
    }

    let intentUtterances = originalIntent.utterances || []
    this.state = {
      intent: {
        utterances: intentUtterances,
        entities: [],
        name: '',
        description: '',
        ...originalIntent
      },
      utterances: intentUtterances,
      invalidUtterances: [],
      editName: false,
      entityView: false,
      selectedEntity: null,
      workspaceEntities
    }
  }

  validateUtterance(utterance, items) {}

  handleDescriptionChange = event => {
    let intent = this.state.intent
    intent.description = event.target.value
    this.setState({ intent, errors: [] })
    this.props.handleFormEdited()
  }
  handleNameChange(event) {
    // this.setState({ "intent.name": event.target.value, errors: [] })
    let intent = this.state.intent
    intent.name = event.target.value
    this.setState({ intent, errors: [] })
    this.props.handleFormEdited()
  }
  onTitleEditorKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.setState({ editName: false })
    }
  }
  handleUtteranceSubmit(utterance) {
    // , items
    let newUtterance = {
      value: utterance,
      checked: false,
      isError: false,
      key: this.utteranceKeyCounter++
    } //, items: items
    // let utterances = [newUtterance, ...this.state.utterances];
    let utterances = this.state.utterances
    utterances.unshift(newUtterance)
    this.setState({ utterances: utterances })
    this.props.handleFormEdited()
  }

  handleUtteranceChange(utterance, index) {
    let utterances = this.state.utterances
    let invalidUtterances = [...this.state.invalidUtterances]
    var indexOfUtterance = invalidUtterances.indexOf(utterance.key)
    if (utterance.isError) {
      if (indexOfUtterance === -1) invalidUtterances.push(utterance.key)
    } else {
      if (indexOfUtterance !== -1) invalidUtterances.splice(indexOfUtterance, 1)
    }
    utterances[index] = utterance
    this.setState({ utterances: utterances, invalidUtterances })
    this.props.handleFormEdited()
  }
  handleRemoveSingleUtterance(index) {
    let invalidUtterances = [...this.state.invalidUtterances]
    let utterances = this.state.utterances
    let utterance = utterances[index]
    if (utterance.isError) {
      var indexOfUtterance = invalidUtterances.indexOf(utterance.key)
      if (indexOfUtterance !== -1) invalidUtterances.splice(indexOfUtterance, 1)
    }
    utterances.splice(index, 1)
    this.setState({ utterances: utterances, invalidUtterances })
    this.props.handleFormEdited()
  }
  handleRemoveUtterances(event) {
    let invalidUtterances = [...this.state.invalidUtterances]
    let utterances = this.state.utterances
    let utterancesCount = utterances.length
    for (var k = utterancesCount - 1; k >= 0; k--) {
      let utterance = utterances[k]
      if (utterance.checked) {
        if (utterance.isError) {
          var indexOfUtterance = invalidUtterances.indexOf(utterance.key)
          if (indexOfUtterance !== -1)
            invalidUtterances.splice(indexOfUtterance, 1)
        }
        utterances.splice(k, 1)
      }
    }

    this.setState({ utterances: utterances, invalidUtterances })
    this.props.handleFormEdited()
  }
  handleWorkspaceEntitiesSubmit(entities) {
    let workspaceEntities = this.state.workspaceEntities.map(
      workspaceEntity => {
        let entity = entities.find(
          entity1 => entity1.name === workspaceEntity.name
        )
        if (entity) {
          return entity
        }
        return workspaceEntity
      }
    )
    this.setState({ workspaceEntities })
    this.props.handleFormEdited()
  }
  handleEntitySubmit(entity, isNew = false) {
    if (isNew) {
      let newEntity = { name: entity, utterances: [], prompt: '', values: [] }
      let intent = this.state.intent
      intent.entities.push(newEntity)
      let workspaceEntities = this.state.workspaceEntities // [...this.state.workspaceEntities]
      let existing = workspaceEntities.find(
        workspaceEntity => workspaceEntity.name === entity
      )
      if (!existing) {
        workspaceEntities.push(newEntity)
      }
      // this.setState({ 'intent.entities': [...this.state.intent.entities, newEntity] })
      this.setState({ intent, workspaceEntities })
    }
  }

  handleEntityPromptChange(val) {
    let selectedEntity = this.state.selectedEntity
    selectedEntity.prompt = val // event.currentTarget.value;
    this.setState({ selectedEntity })
    this.props.handleFormEdited()
  }

  validateIntentSave() {
    let { notify } = this.props
    if (this.state.invalidUtterances.length > 0) {
      let utterance = this.state.intent.utterances.find(
        utterance => utterance.key === this.state.invalidUtterances[0]
      )
      let entity
      if (!utterance) {
        entity = this.state.intent.entities.find(entity => {
          utterance = entity.utterances.find(
            utterance => utterance.key === this.state.invalidUtterances[0]
          )
          if (utterance) {
            return true
          }
          return false
        })
      }
      if (!utterance) {
        notify({
          title: `Something went wrong`,
          message: `Could not locate invalid utterance`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
        return false
      }

      let message = ''
      if (entity) {
        message += ` in ${entity.name} entity`
      } else {
        message += ' in intent user says'
      }
      if (this.state.invalidUtterances.length > 1) {
        message += ` and ${this.state.invalidUtterances.length -
          1} other user says `
      }

      notify({
        title: `Found ${this.state.invalidUtterances.length} wrong user says`,
        message: `'${utterance.value}'${message}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
      return false
    }
    if (!validateWithRegEx(this.state.intent.name, NAME_VALIDATION_REGEX)) {
      notify({
        title: `Invalid Name`,
        message: `Name should start with alphabet and contain only alpha numeric and '_', '-', '.', '#'`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
      return false
    }
    if (this.state.intent.utterances.length < 20) {
      notify({
        title: `Need more utterances`,
        message: `You need to add at least 20 utterances to intent`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
      return false
    }
    return true
  }
  handleSave(event) {
    if (!this.validateIntentSave()) {
      if (this.props.saveToLocal) {
        this.props.saveToLocal(this.convertToJSON())
      }
      return
    }
    let intentObj = this.convertToJSON()
    let entities = this.state.workspaceEntities.reduce((obj, entity) => {
      obj[entity.name] = {
        type: 'dict',
        values: entity.values.reduce((objValue, value) => {
          objValue[value.name] = value.synonyms
          return objValue
        }, {})
      }
      return obj
    }, {})
    this.props.onSubmit(intentObj, entities)
  }

  convertToJSON() {
    let outputJSON = {
      name: this.state.intent.name,
      description: this.state.intent.description,
      entities: this.state.intent.entities.map(entity => entity.name),
      utterances: this.state.intent.utterances.map(
        utterance => utterance.value
      ),
      dialog: this.state.intent.entities.reduce((obj, entity) => {
        obj[entity.name] = {
          prompt: [entity.prompt],
          utterances: entity.utterances.map(utterance => utterance.value)
        }
        return obj
      }, {})
    }
    console.log('OUTPUT JSON: ', JSON.stringify(outputJSON))
    return outputJSON
  }

  convertFromJSON(jsonData) {
    let utterances = jsonData.utterances.map(utterance => {
      return {
        value: utterance,
        checked: false,
        isError: false,
        key: this.utteranceKeyCounter++
      }
    })
    let entities = jsonData.entities.map(entity => {
      let entityObj = { name: entity, utterances: [], prompt: '', values: [] }
      if (jsonData.dialog && jsonData.dialog[entity]) {
        if (
          jsonData.dialog[entity].prompt &&
          jsonData.dialog[entity].prompt.length > 0
        ) {
          entityObj.prompt = jsonData.dialog[entity].prompt[0]
        }
        entityObj.utterances = jsonData.dialog[entity].utterances.map(
          utterance => {
            return {
              value: utterance,
              checked: false,
              isError: false,
              key: this.utteranceKeyCounter++
            }
          }
        )
      }
      return entityObj
    })
    let name = jsonData.name || ''
    let description = jsonData.description || ''
    return {
      utterances,
      entities,
      name,
      description
    }
  }

  handleEntityTabClick(event) {
    if (event.currentTarget.classList.contains('selected-entity-tab')) {
      this.setState({
        selectedEntity: null,
        utterances: this.state.intent.utterances
      })
    } else {
      let selectedEntity = this.state.intent.entities.find(
        entity => entity.name === event.currentTarget.textContent
      )
      this.setState({ selectedEntity, utterances: selectedEntity.utterances })
    }
  }

  renderEntityTabs() {
    return (
      <div className="entities-tab">
        {this.state.intent.entities.map(entity => (
          <button
            key={entity.name}
            type="button"
            className={
              'btn btn-info btn-rounded mr-2 mb-1 btn-sm entity-tab ' +
              (this.state.selectedEntity &&
              this.state.selectedEntity.name === entity.name
                ? ' selected-entity-tab'
                : ' btn-outline')
            }
            onClick={this.handleEntityTabClick.bind(this)}>
            {entity.name}
          </button>
        ))}
      </div>
    )
  }

  renderHeader() {
    const { t } = this.props
    return (
      <div className="header">
        <div className="title">
          <TitleEditor
            name={this.state.intent.name}
            placeholder={t('use-case-name')}
            handleChange={this.handleNameChange.bind(this)}
            shouldValidate
          />
        </div>
        <div className="buttons">
          <SaveButton
            handleSave={this.handleSave.bind(this)}
            className={
              this.state.invalidUtterances.length
                ? ' btn-warning float-right'
                : ' btn-primary float-right'
            }
          />
          {!!this.props.intent &&
            this.props.intent.lastUpdated && (
              <span className="float-right mr-3">
                {moment(this.props.intent.lastUpdated).fromNow()}
              </span>
            )}
        </div>
      </div>
    )
  }

  render() {
    const { t } = this.props
    return (
      <div className="page-content">
        {this.renderHeader()}
        <form onSubmit={e => e.preventDefault()} className="intent-form">
          <div className="form-group">
            <input
              type="text"
              className="intent-description input-no-focus-outline"
              placeholder={t('describe-your-use-case')}
              value={this.state.intent.description}
              name="intent.description"
              onChange={this.handleDescriptionChange}
            />
          </div>
          {this.renderEntityTabs()}
          {!!this.state.selectedEntity && (
            <UtteranceEditor
              onSubmit={this.handleEntityPromptChange.bind(this)}
              placeholder={t('enter-prompt')}
              isPrompt
              isNewEditor={false}
              shouldExpand={false}
              initialContent={this.state.selectedEntity.prompt}
              entities={this.state.intent.entities}
              workspaceEntities={this.state.workspaceEntities}
              handleWorkspaceEntitiesSubmit={this.handleWorkspaceEntitiesSubmit.bind(
                this
              )}
              handleEntitySubmit={this.handleEntitySubmit.bind(this)}
              className="mt-3"
            />
          )}
          <UtterancesContainer
            items={this.state.utterances}
            handleUtteranceChange={this.handleUtteranceChange.bind(this)}
            handleRemoveUtterances={this.handleRemoveUtterances.bind(this)}
            handleRemoveSingleUtterance={this.handleRemoveSingleUtterance.bind(
              this
            )}
            handleEntitySubmit={this.handleEntitySubmit.bind(this)}
            entities={this.state.intent.entities}
            workspaceEntities={this.state.workspaceEntities}
            handleWorkspaceEntitiesSubmit={this.handleWorkspaceEntitiesSubmit.bind(
              this
            )}
            handleUtteranceSubmit={this.handleUtteranceSubmit.bind(this)}
          />
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    workspace: state.workspace
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
  translate('translations')(IntentsForm)
)
// export default Menu
