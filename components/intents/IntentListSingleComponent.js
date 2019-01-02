import React, { Component } from 'react'

class IntentListSingleComponent extends Component {
  handleOnClick() {
    this.props.handleIntentClick(this.props.intent)
  }
  handleRemoveClick(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.handleRemoveClick(this.props.intent)
  }
  render() {
    const { intent } = this.props
    return (
      <div
        className="intent-component pl-2"
        onClick={this.handleOnClick.bind(this)}>
        <span className="intent-name col-4">{intent.name}</span>
        <span className="intent-description col-7">{intent.description}</span>
        <span className="buttons">
          <i
            className="ion-icon ion-icon-2x ion-ios-trash-outline remove"
            onClick={this.handleRemoveClick.bind(this)}
          />
        </span>
      </div>
    )
  }
}

export default IntentListSingleComponent
