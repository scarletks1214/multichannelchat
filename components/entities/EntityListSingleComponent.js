import React, { Component } from 'react'
import EntityValueComponent from './EntityValueComponent'
import AutosizeInput from '../global/AutosizeInput'
import AddEditorComponent from '../global/AddEditorComponent'

class EntityListSingleComponent extends Component {
  handleNewValue(value) {
    let { entity } = this.props
    entity.values.push({ name: value, synonyms: [] })
    this.props.handleEntityChange(entity)
  }
  handleEntityNameChange(event) {
    let { entity } = this.props
    entity.name = event.currentTarget.value
    this.props.handleEntityChange(entity)
  }
  handleValueChange(value, index) {
    let { entity } = this.props
    entity.values[index] = value
    this.props.handleEntityChange(entity)
  }
  handleValueRemove(index) {
    let { entity } = this.props
    entity.values.splice(index, 1)
    this.props.handleEntityChange(entity)
  }
  handleRemove() {
    this.props.handleRemove(this.props.index)
  }
  render() {
    const { entity } = this.props

    return (
      <div className="entity-row entity-component">
        <div className="column-name">
          <AutosizeInput
            placeholder="Entity name"
            placeholderIsMinWidth
            value={entity.name}
            onChange={this.handleEntityNameChange.bind(this)}
            readOnly={this.props.onlyValueEditor}
          />
          {!this.props.onlyValueEditor && (
            <i
              className="fa fa-trash ml-2"
              onClick={this.handleRemove.bind(this)}
            />
          )}
        </div>
        <div className="column-value values-container">
          {entity.values.map((value, index) => (
            <EntityValueComponent
              value={value}
              index={index}
              key={index}
              handleChange={this.handleValueChange.bind(this)}
              handleRemove={this.handleValueRemove.bind(this)}
            />
          ))}
          <AddEditorComponent
            placeholder="Add value"
            className="new-entity-value"
            handleDone={this.handleNewValue.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default EntityListSingleComponent
