import React, { Component } from 'react'
import { IconAdd } from '../../assets/icons'
import AutosizeInput from './AutosizeInput'

class AddEditorComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = event => this.setState({ value: event.target.value })

  handleDone() {
    if (this.state.value !== '') {
      this.props.handleDone(this.state.value)
      this.setState({ value: '' })
    }
  }

  onEditorKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.handleDone()
    }
  }

  render() {
    const { placeholder, hideIcon } = this.props
    return (
      <div className={'add-editor-component ' + (this.props.className || '')}>
        <AutosizeInput
          placeholder={placeholder}
          placeholderIsMinWidth
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.onEditorKeyDown.bind(this)}
        />
        {!hideIcon && (
          <IconAdd className="add-icon" onClick={this.handleDone.bind(this)} />
        )}
      </div>
    )
  }
}

export default AddEditorComponent
