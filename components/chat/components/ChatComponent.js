import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ChatWindow from './ChatWindow'
import launcherIcon from './../assets/logo-no-bg.svg'
// import launcherIconActive from './../assets/close-icon.png'

class ChatComponent extends Component {
  constructor() {
    super()
    this.state = {
      launcherIcon,
      isOpen: false
    }
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick()
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty('isOpen')
      ? this.props.isOpen
      : this.state.isOpen
    // const classList = ['sc-launcher', isOpen ? 'opened' : '']
    return (
      // <div>
      //   <div>
      //     className={classList.join(' ')}
      //     onClick={this.handleClick.bind(this)}>
      //     <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
      //     <img className={'sc-open-icon'} src={launcherIconActive} alt="open" />
      //     <img className={'sc-closed-icon'} src={launcherIcon} alt="close" />
      //   </div>
      <ChatWindow
        messageList={this.props.messageList}
        onUserInputSubmit={this.props.onMessageWasSent}
        agentProfile={this.props.agentProfile}
        onDetailClick={this.props.onDetailClick}
        isOpen={isOpen}
        onClose={this.handleClick.bind(this)}
      />
      // </div>
    )
  }
}

// const MessageCount = props => {
//   if (props.count === 0 || props.isOpen === true) {
//     return null
//   }
//   return <div className={'sc-new-messsages-count'}>{props.count}</div>
// }

ChatComponent.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  showEmoji: PropTypes.bool
}

ChatComponent.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
}

export default ChatComponent
