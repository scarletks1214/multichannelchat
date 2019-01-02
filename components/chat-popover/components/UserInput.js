import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { translate } from 'react-i18next'

class UserInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputActive: false,
      inputText: ''
    }
  }

  handleKey(event) {
    if (event.keyCode === 13) {
      //  && !event.shiftKey
      this._submitText(event)
    }
  }

  _submitText(event) {
    event.preventDefault()
    let inputText = this.state.inputText.trim()
    if (inputText !== '') {
      this.props.onSubmit(inputText)
    }
    this.setState({ inputText: '' })
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { t } = this.props
    return (
      <div
        className={`sc-user-input ${this.state.inputActive ? 'active' : ''}`}>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field input-no-focus-outline"
            placeholder={t('input-here')}
            value={this.state.inputText}
            name="inputText"
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleKey.bind(this)}
          />
        </div>
      </div>
    )
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default translate('translations')(UserInput)
