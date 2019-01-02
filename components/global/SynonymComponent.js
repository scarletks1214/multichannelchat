import React, { Component } from 'react'
import AutosizeInput from '../global/AutosizeInput'

class SynonymComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }
  handleDone() {
    this.setState({ isEditing: false })
  }
  handleChange(event) {
    this.props.handleChange(event.currentTarget.value, this.props.index)
  }
  handleRemove(event) {
    this.props.handleRemove(this.props.index)
  }
  render() {
    const { value } = this.props

    return (
      <div className="synonym-wrapper mr-2 mb-2">
        <AutosizeInput
          placeholder={this.props.placeholder}
          placeholderIsMinWidth
          value={value}
          onChange={this.handleChange.bind(this)}
        />
        <i
          className="fa fa-close ml-2"
          onClick={this.handleRemove.bind(this)}
        />
      </div>
    )
  }
}

export default SynonymComponent
