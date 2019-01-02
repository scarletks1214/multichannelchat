import React from 'react'
import axios from 'axios'
import * as _ from 'lodash'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { ChatComponent } from '../../components/chat'
import QueryDetail from '../../components/chat/components/Messages/QueryDetail'

import BetaLogo from './beta_logo.png'

class DemoPage extends React.Component {
  constructor() {
    super()
    this.state = {
      messageList: [],
      modal: { isOpen: false, content: '' },
      apiVersion: '1.1'
    }
  }

  async _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })

    const url =
      this.state.apiVersion === '1.1'
        ? 'https://staging-api.triniti.ai/v1/all/process?domain=TrinitiTrainer&version=3'
        : 'https://staging-api.triniti.ai/v1/all/process?domain=TrinitiTrainer&version=3'

    const { data } = await axios({
      method: 'POST',
      headers: {
        'X-Api-Key': 'feac94f1fad634d7028962bf602722e1',
        apikey: 1,
        'content-type': 'application/json',
        userid: 1
      },
      url,
      data: {
        input: message.data.text,
        prompt: '',
        sessionhistory: [],
        currentintent: '',
        expectedentities: [],
        mode: '',
        transactionFlag: false,
        contextedEntities: null
      }
    })

    data.queries.forEach(query => {
      const highestIntent = _(query.intent)
        .sortBy('confidence')
        .reverse()
        .head()

      const entities = _(query.entities).reduce(
        (result, { entityType, entityValue }) => {
          result.push(`${entityType} = ${entityValue}`)
          return result
        },
        []
      )

      const response = _(query.response).reduce((result, { message }) => {
        if (message) {
          result.push(message)
        }
        return result
      }, [])

      this.setState(
        Object.assign({}, this.state, {
          messageList: [
            ...this.state.messageList,
            {
              author: 'them',
              type: 'text',
              data: {
                text: `Intent: ${highestIntent.class}\n${
                  entities.length ? `[ ${entities.join(', ')} ]\n` : ''
                }${response.length ? '---\n' + response.join('\n') : ''}`,
                info: data
              }
            }
          ]
        })
      )
    })
  }

  toggle() {
    this.setState(
      Object.assign({}, this.state, {
        modal: {
          isOpen: !this.state.modal.isOpen,
          content: ''
        }
      })
    )
  }

  _onDetaiInfo(data) {
    this.setState(
      Object.assign({}, this.state, {
        modal: {
          isOpen: true,
          content: data
        }
      })
    )
  }

  onVersionChange(e) {
    this.setState(
      Object.assign({}, this.state, {
        apiVersion: e.currentTarget.value
      })
    )
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal.isOpen}
          toggle={this.toggle.bind(this)}
          wrapClassName="modal-info">
          <ModalHeader toggle={this.toggle.bind(this)}>
            Query Details
          </ModalHeader>
          <ModalBody>
            <QueryDetail info={this.state.modal.content} />
          </ModalBody>
        </Modal>
        <div className="container doc-page demo-section">
          <div>
            <div>
              <label className="custom-control custom-radio">
                <input
                  name="api-version"
                  type="radio"
                  className="custom-control-input"
                  value="1.1"
                  checked={this.state.apiVersion === '1.1'}
                  onChange={this.onVersionChange.bind(this)}
                />
                <span className="custom-control-indicator" />
                <span className="custom-control-description">Toggle this</span>
              </label>
            </div>
            <div>
              <label className="custom-control custom-radio">
                <input
                  name="api-version"
                  type="radio"
                  className="custom-control-input"
                  value="2"
                  checked={this.state.apiVersion === '2'}
                  onChange={this.onVersionChange.bind(this)}
                />
                <span className="custom-control-indicator" />
                <span className="custom-control-description">Or this</span>
              </label>
            </div>
          </div>
          <div>
            <ChatComponent
              agentProfile={{
                imageUrl: BetaLogo
              }}
              onMessageWasSent={this._onMessageWasSent.bind(this)}
              onDetailClick={this._onDetaiInfo.bind(this)}
              messageList={this.state.messageList}
              showEmoji={false}
              isOpen={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default DemoPage
