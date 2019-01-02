import React, { Component } from 'react'
import SendIcon from './icons/SendIcon'
import { translate } from 'react-i18next'

class ConversationUserInput extends Component {
  constructor() {
    super()
    this.state = {
      inputActive: false
    }
  }

  handleKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event)
    }
  }

  _submitText(event) {
    event.preventDefault()
    const text = this.userInput.textContent
    if (text && text.length > 0) {
      this.props.onSubmit(text)
      this.userInput.innerHTML = ''
    }
  }

  render() {
    const { t } = this.props
    return (
      <form
        className={`sc-user-input ${this.state.inputActive ? 'active' : ''}`}>
        <div
          role="button"
          tabIndex="0"
          onFocus={() => {
            this.setState({ inputActive: true })
          }}
          onBlur={() => {
            this.setState({ inputActive: false })
          }}
          ref={e => {
            this.userInput = e
          }}
          onKeyDown={this.handleKey.bind(this)}
          contentEditable="true"
          placeholder={t('write-a-reply')}
          className="sc-user-input--text"
        />
        <div className="sc-user-input--buttons">
          <div className="sc-user-input--button">
            <SendIcon onClick={this._submitText.bind(this)} />
          </div>
        </div>
      </form>
    )
  }
}

export default translate('translations')(ConversationUserInput)
