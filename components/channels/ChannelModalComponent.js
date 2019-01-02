import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Loader } from '../global/loader'
import { THIRD_PARTY_MAP } from '../../config'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { addNotification as notify } from 'reapop'
import { updateChannel } from '../../actions/channel'

class ChannelModalComponent extends Component {
  constructor(props) {
    super(props)
    let { channel, ...channelData } = this.props.channel
    this.state = {
      channel: channelData
    }
  }
  handleValueChange(event) {
    let channel = this.state.channel
    let name = event.target.name
    channel.details.forEach(element => {
      if (element.name === name) {
        element.value = event.target.value
      }
    })
    this.setState({ channel })
  }
  async handleUpdate(event) {
    const { updateChannel, workspace, channel, notify, closeModal } = this.props

    try {
      let response = await updateChannel(
        workspace,
        channel.channel,
        this.state.channel
      )
      if (!response.success) {
        notify({
          title: `Error`,
          message: `Failed to update channel`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      } else {
        notify({
          title: `Success`,
          message: `Channel successfully updated`,
          status: 'success',
          position: 'tr',
          dismissible: true
        })
        closeModal()
      }
    } catch (err) {
      notify({
        title: `Error`,
        message: `Failed to update channel : ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  render() {
    const { isOpen, closeModal, t } = this.props
    const { channel } = this.state

    return (
      <Modal
        isOpen={isOpen}
        toggle={closeModal}
        size="lg"
        wrapClassName="modal-primary channel-modal">
        <ModalBody>
          <div className="header">
            <img
              src={THIRD_PARTY_MAP[this.props.channel.channel].icon}
              className="channel-logo rounded-circle"
              alt=""
            />
            <span>{THIRD_PARTY_MAP[this.props.channel.channel].title}</span>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: THIRD_PARTY_MAP[this.props.channel.channel].description
            }}
          />
          {channel.details &&
            channel.details.length > 0 && (
              <div className="input-container">
                {channel.details.map(detail => (
                  <div className="channel-input" key={detail.name}>
                    <div className="channel-name">{detail.name}</div>
                    <div className="input-wrapper">
                      <input
                        name={detail.name}
                        value={detail.value}
                        onChange={this.handleValueChange.bind(this)}
                        disabled={!detail.editable}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-default btn-unsaved-nav text-uppercase"
            onClick={closeModal}>
            {t('cancel')}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-unsaved-nav text-uppercase"
            onClick={this.handleUpdate.bind(this)}>
            {t('save')}
          </button>
        </ModalFooter>
        <Loader loading={this.props.isLoading} text={t('saving')} fullPage />
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.channel.isLoading,
    workspace: state.workspace.workspace
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateChannel, notify }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(ChannelModalComponent)
)
