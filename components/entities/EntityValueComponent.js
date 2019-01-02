import React, { Component } from 'react'
import { AddEditorComponent, AutosizeInput, SynonymComponent } from '../global'

class EntityValueComponent extends Component {
  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value, errors: [] })

  onSynonymEditorKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.handleNewSynonym()
    }
  }

  handleNewSynonym(newSynonym) {
    if (newSynonym !== '') {
      let { value } = this.props
      value.synonyms.push(newSynonym)
      this.props.handleChange(value, this.props.index)
    }
  }
  handleNameChange(event) {
    let { value } = this.props
    value.name = event.currentTarget.value
    this.props.handleChange(value, this.props.index)
  }
  handleSynonymsChange(synonym, index) {
    let { value } = this.props
    value.synonyms[index] = synonym
    this.props.handleChange(value, this.props.index)
  }
  handleSynonymsRemove(index) {
    let { value } = this.props
    value.synonyms.splice(index, 1)
    this.props.handleChange(value, this.props.index)
  }
  handleRemove(event) {
    this.props.handleRemove(this.props.index)
  }
  render() {
    const { value } = this.props

    return (
      <div className="entity-value-component">
        <div className="column-name">
          <AutosizeInput
            placeholder="Value name"
            placeholderIsMinWidth
            value={value.name}
            onChange={this.handleNameChange.bind(this)}
          />
          <i
            className="fa fa-trash ml-2"
            onClick={this.handleRemove.bind(this)}
          />
        </div>

        <div className="column-synonym">
          {value.synonyms.map((value, index) => (
            <SynonymComponent
              value={value}
              index={index}
              key={index}
              handleChange={this.handleSynonymsChange.bind(this)}
              handleRemove={this.handleSynonymsRemove.bind(this)}
            />
          ))}
          <AddEditorComponent
            placeholder="Add synonym"
            className="new-synonym mr-3"
            handleDone={this.handleNewSynonym.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default EntityValueComponent
