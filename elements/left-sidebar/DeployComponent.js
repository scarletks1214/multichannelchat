import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { API_BASE_URL } from '../../config/constants'
import { deployWorkspace, cancelDeploy } from '../../actions/deploy'
import { addNotification as notify } from 'reapop'
import { getAccessToken } from '../../utils/AuthManager'
import 'event-source-polyfill/src/eventsource.js'
// import '../../utils/EventSource'
import { Loader, LoadingOverlay } from '../../components/global/loader'

class DeployComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProgress: false,
      deploys: []
    }
  }
  componentDidMount() {
    this.connectToDeployStream()
  }
  componentWillUnmount() {
    console.log('HALA componentWillUnmount')
    this.closeDeployStream()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.workspace.id !== this.props.workspace.id) {
      this.closeDeployStream()
      if (!this.eventSource) {
        this.connectToDeployStream()
      }
      return
    }
  }
  updateDeploys(deploy) {
    let isUpdate = false
    let deploys = this.state.deploys.map(depl => {
      if (depl.data_id === deploy.data_id) {
        isUpdate = true
        return deploy
      }
      return depl
    })
    if (!isUpdate) {
      deploys.push(deploy)
    }
    this.setState({ deploys })
  }
  removeDeploy(deploy) {
    let deploys = this.state.deploys.filter(
      depl => depl.data_id !== deploy.data_id
    )
    this.setState({ deploys })
  }
  closeDeployStream() {
    try {
      if (this.eventSource) {
        console.log('HALA closeDeployStream', this.eventSource)
        this.eventSource.close()
        this.eventSource = null
      }
    } catch (err) {
      this.eventSource = null
      console.log('Error while closing stream', err)
    }
  }
  connectToDeployStream() {
    const self = this
    this.closeDeployStream()
    const { workspace } = this.props
    if (!workspace) {
      return
    }
    this.eventSource = new global.EventSourcePolyfill(
      `${API_BASE_URL}/api/workspaces/${workspace.id}/deploy-stream`,
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': getAccessToken()
        },
        heartbeatTimeout: 450000000
      }
    )
    this.eventSource.addEventListener('open', function(e) {
      console.log('connected')
    })
    this.eventSource.addEventListener(
      'message',
      function(e) {
        console.log('EventSource data :.', e.data)
        try {
          let info = JSON.parse(e.data)
          self.updateDeploys(info.status)
        } catch (err) {
          console.log('Parse Error', err)
        }
      },
      false
    )

    this.eventSource.addEventListener(
      'error',
      function(e) {
        console.log('EventSource error :.', e)
        if (e.readyState === EventSource.CLOSED) {
          self.connectToDeployStream()
        }
      },
      false
    )
  }

  async deployWorkspace(event) {
    const { workspace, notify, deployWorkspace } = this.props
    try {
      if (!this.eventSource) {
        this.connectToDeployStream()
      }
      let response = await deployWorkspace(workspace)
      if (response.success) {
      } else {
        notify({
          title: 'Error',
          message: 'Deploy Failed',
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      }
    } catch (err) {
      notify({
        title: 'Error',
        message: 'Deploy Failed',
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  async cancelDeploy(deploy) {
    try {
      const { cancelDeploy } = this.props
      let response = await cancelDeploy(deploy)
      if (response.success) {
        this.removeDeploy(deploy)
      } else {
        notify({
          title: 'Error',
          message: 'Cancel Deploy Failed',
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      }
    } catch (err) {
      notify({
        title: 'Error',
        message: `Deploy Failed - ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  render() {
    const { t } = this.props
    return (
      <div className="section deploy-component">
        <div className="section-title" />
        <div className="deploy-button-container">
          <LoadingOverlay className="chat-content-wrapper">
            <button
              onClick={this.deployWorkspace.bind(this)}
              className="btn btn-primary btn-icon btn-rounded">
              <i className="material-icons">grade</i>
              <span className="title">{t('deploy')}</span>
            </button>
            <Loader loading={this.props.isDeploying} text="" />
          </LoadingOverlay>
        </div>
        {this.state.deploys &&
          this.state.deploys.length > 0 && (
            <div className="progress-container">
              {this.state.deploys.map((deploy, index) => (
                <div className="deploy-item" key={deploy.data_id}>
                  <span>{`Deploy ${index + 1}`}</span>
                  <div className="progress progress-lg">
                    <div
                      className="progress-bar bg-danger"
                      value={deploy.percentage}
                      style={{ width: `${deploy.percentage}%` }}
                    />
                    <span>{deploy.percentage}%</span>
                  </div>
                  <button
                    className="btn btn-default btn-circle btn-xs btn-outline btn-cancel-deploy"
                    onClick={event => this.cancelDeploy(deploy)}>
                    <i className="material-icons">clear</i>
                  </button>
                </div>
              ))}
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    workspace: state.workspace.workspace,
    // deploys: state.deploy.deploys,
    isDeploying: state.deploy.deploying
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify,
      deployWorkspace,
      cancelDeploy
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(DeployComponent)
)
