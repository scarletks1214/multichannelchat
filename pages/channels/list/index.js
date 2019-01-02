import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { addNotification as notify } from 'reapop'
import Jumbotron from '../../../elements/jumbotron'

import { loadChannels, updateChannel } from '../../../actions/channel'
import { Loader } from '../../../components/global'
import ChannelItemComponent from '../../../components/channels/ChannelItemComponent'
import ChannelModalComponent from '../../../components/channels/ChannelModalComponent'

class ChannelPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showGridView: false,
      currentChannel: null
    }
  }

  componentDidMount() {
    const { loadChannels, workspace, channels } = this.props
    if (channels.length > 0) {
      return
    }
    loadChannels(workspace)
  }

  showChannelModal(channel) {
    this.setState({ currentChannel: channel })
  }
  closeModal() {
    this.setState({ currentChannel: null })
  }
  async handleEnableChannel(channel, checked) {
    const { updateChannel } = this.props
    let response = await updateChannel(this.props.workspace, channel.channel, {
      // ...channel,
      enable: checked
    })
    if (response && response.success) {
      if (checked) {
        this.setState({ currentChannel: channel })
      }
    } else {
      notify({
        title: 'Error',
        message: 'Failed to update channel',
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  renderChannels() {
    const { channels } = this.props
    return (
      <div className="channels-container">
        {channels.map(channel => (
          <ChannelItemComponent
            channel={channel}
            key={channel.channel}
            onChannelClick={this.showChannelModal.bind(this)}
            handleEnableChannel={this.handleEnableChannel.bind(this)}
          />
        ))}
      </div>
    )
  }

  render() {
    const { t } = this.props
    let navInfo = [{ url: '', title: this.props.workspace.name }]
    return (
      <div className="page channels-list-page">
        <Jumbotron navInfo={navInfo} />
        <div className="page-content">
          <div className="header">
            <h3 className="text-uppercase">{t('channels')}</h3>
          </div>
          {this.renderChannels()}
          <Loader
            loading={this.props.isLoading}
            text={this.state.loadMessage || t('loading')}
            fullPage
          />
        </div>
        {this.state.currentChannel && (
          <ChannelModalComponent
            channel={this.state.currentChannel}
            isOpen={true}
            closeModal={this.closeModal.bind(this)}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    channels: state.channel.channels,
    isLoading: state.channel.isLoading,
    workspace: state.workspace.workspace
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadChannels, updateChannel, notify }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(ChannelPage)
)
