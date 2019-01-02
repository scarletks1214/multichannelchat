import React, { Component } from 'react'

class Message extends Component {
  render() {
    let contents
    if (!this.props.content) {
      return null
    }
    if (typeof this.props.content === 'string') {
      contents = this.props.content
    } else {
      contents = this.props.content.map((txt, index) => (
        <div key={index}>{txt}</div>
      ))
    }
    return (
      <div
        className={
          'sc-message ' + (this.props.className ? this.props.className : '')
        }>
        <div className="title">{this.props.title}</div>
        <div className="content">{contents}</div>
      </div>
    )
  }
}

export default Message
