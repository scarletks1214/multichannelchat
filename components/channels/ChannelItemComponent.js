import React, { Component } from 'react'
import Toggle from 'react-toggle'
import { THIRD_PARTY_MAP } from '../../config/info'

class ChannelItemComponent extends Component {
  handleEnableChannel(event) {
    this.props.handleEnableChannel(this.props.channel, event.target.checked)
  }
  handleOnClick(event) {
    this.props.onChannelClick(this.props.channel)
  }
  render() {
    return (
      <div className={'channel-item-component ' + (this.props.className || '')}>
        <div className="content">
          <div
            className="top-container"
            onClick={this.handleOnClick.bind(this)}>
            <img
              src={THIRD_PARTY_MAP[this.props.channel.channel].icon}
              className="channel-logo rounded-circle"
              alt=""
            />
          </div>
          <div className="bottom-container">
            <span className="title">
              {THIRD_PARTY_MAP[this.props.channel.channel].title}
            </span>
            <Toggle
              checked={this.props.channel.enable}
              icons={false}
              onChange={this.handleEnableChannel.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChannelItemComponent
