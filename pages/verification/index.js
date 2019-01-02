import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from '../Form'
import { translate } from 'react-i18next'
import { verifyEmailWithToken } from '../../utils/ApiManager'
import EmptyView1 from '../../layouts/EmptyView1'
import { fetchProfile } from '../../actions/authActions'
import { addNotification as notify } from 'reapop'
// import { AuthManager } from '../../utils'

class VerificationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  }

  componentDidMount() {
    const { t } = this.props
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.verifyToken
    ) {
      this.setState({ isLoading: true })
      this.verifyEmailToken(this.props.match.params.verifyToken)
    } else {
      this.setState({
        isError: true,
        errorMessage: t('verification-token-not-provided')
      })
    }
  }

  async verifyEmailToken(event) {
    let token = this.props.match.params.verifyToken
    let { t, notify } = this.props
    let result
    try {
      result = await verifyEmailWithToken(token)
    } catch (err) {
      console.log('Error', err)
    }
    if (result && result.success) {
      this.setState({ isLoading: false })
      notify({
        title: t('verified'),
        message: t('email-verify-successful-message'),
        status: 'info',
        position: 'tr',
        dismissible: true
      })
      setTimeout(() => {
        this.props.history.push('/login')
      }, 4000)
    } else {
      this.setState({
        isLoading: false,
        isError: true,
        errorMessage:
          result && result.statusMsg
            ? t(`ERROR-MESSAGE-${result.statusMsg}`)
            : t('connection-timed-out')
      })
    }
  }

  renderStatus() {
    const { t } = this.props
    if (this.state.isError) {
      return (
        <div className="links text-center">
          <div>{this.state.errorMessage}</div>
        </div>
      )
    }
    return (
      <div className="links text-center">
        <p>
          <span className="m-r-5">{t('email-verify-successful-message')}</span>
          <span className="m-r-5">{t('redirect-to-login-page-message')}</span>
        </p>
      </div>
    )
  }
  render() {
    const { t } = this.props
    return (
      <div className="page login-register-page verification-page">
        <h2>{t('email-verification')}</h2>
        <Form>
          {this.state.isLoading ? (
            <div>{t('verifying')}</div>
          ) : (
            this.renderStatus()
          )}
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfile,
      notify
    },
    dispatch
  )

export default EmptyView1(
  connect(null, mapDispatchToProps)(translate('translations')(VerificationPage))
)
