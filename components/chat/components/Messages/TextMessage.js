import React from 'react'

class TextMessage extends React.Component {
  render() {
    return <div className="sc-message--text">{this.props.data.text}</div>
  }
}

export default TextMessage
