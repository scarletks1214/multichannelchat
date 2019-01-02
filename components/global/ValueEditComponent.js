import React, { Component } from 'react'

class ValueEditComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }
  handleDone() {
    this.setState({ isEditing: false })
  }
  onTitleEditorKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.handleDone()
    }
  }
  handleStartEditing() {
    this.setState({ isEditing: true })
    this.refs.input.focus()
  }
  render() {
    const { value } = this.props

    return (
      <div className="value-editor-container mr-2">
        <input
          type="text"
          name="value"
          className="value-input"
          placeholder={this.props.placeholder}
          value={value}
          onChange={this.props.handleChange}
          onKeyDown={this.onTitleEditorKeyDown.bind(this)}
          readOnly={!this.state.isEditing}
          ref="input"
        />
        {this.state.isEditing ? (
          <i
            className="fa fa-check ml-2"
            onClick={this.handleDone.bind(this)}
          />
        ) : (
          <i
            className="fa fa-pencil ml-2"
            onClick={this.handleStartEditing.bind(this)}
          />
        )}
        <i className="fa fa-trash ml-2" onClick={this.props.handleRemove} />
      </div>
    )
  }
}

export default ValueEditComponent
