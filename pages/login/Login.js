import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from '../Form'
import InputGroup1 from '../InputGroup1'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import approve from 'approvejs'
import { Loader, LoadingOverlay } from '../../components/global/loader'
import { login } from '../../utils/ApiManager'
import { loginSuccess } from '../../actions/authActions'
import { addNotification as notify } from 'reapop'

class Login extends Component {
  constructor(props) {
    super(props)
    const { t } = this.props
    this.state = {
      valid: false,
      fields: [
        {
          value: '',
          name: 'email',
          type: 'text',
          errors: [],
          placeholder: t('email'),
          rules: {
            title: t('email'),
            email: true
          }
        },
        {
          value: '',
          name: 'password',
          type: 'password',
          errors: [],
          placeholder: t('password'),
          rules: {
            title: t('password'),
            required: true
          }
        }
      ]
    }
  }

  componentDidMount() {}
  handleChange(event) {
    let fields = this.state.fields
    fields.forEach(field => {
      if (field.name === event.currentTarget.name) {
        field.value = event.currentTarget.value
        field.errors = []
      }
    })
    this.setState({ fields, valid: true })
  }

  async handleLogin(event) {
    let { t, notify, loginSuccess } = this.props
    let fields = this.state.fields
    let valid = true
    fields = fields.map(field => {
      field.errors = []
      let result = approve.value(field.value, field.rules)
      if (result.errors.length > 0) {
        field.errors = Array.from(result.errors)
        valid = false
      }
      return field
    })
    this.setState({ fields, valid })
    if (valid) {
      // Then we should do login here
      try {
        this.setState({ isLoading: true })
        let { data, headers } = await login({
          emailId: fields[0].value,
          password: fields[1].value
        })
        this.setState({ isLoading: false })
        if (data.success && headers['x-csrf-token']) {
          loginSuccess({ token: headers['x-csrf-token'] })
          // this.props.history.push(`/dashboard`)
        } else {
          notify({
            title: `Error`,
            message: data.msg || t(`${data.statusMsg}`), // t(`ERROR-MESSAGE-${response.statusMsg}`.toLowerCase()),
            status: 'error',
            position: 'tr',
            dismissible: true
          })
        }
      } catch (err) {
        this.setState({ isLoading: false })
        notify({
          title: `Error`,
          message: 'Network or Server Error!',
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      }
    }
  }
  render() {
    let { fields } = this.state
    const { t } = this.props
    return (
      <div className="page login-register-page login-page">
        <h2>{t('log-in')}</h2>
        <Form>
          <LoadingOverlay>
            <InputGroup1
              field={fields[0]}
              onChange={this.handleChange.bind(this)}
            />
            <InputGroup1
              field={fields[1]}
              onChange={this.handleChange.bind(this)}
            />
            <div className="form-group text-center">
              <button
                className="btn btn-primary pr-4 pl-4"
                type="submit"
                onClick={this.handleLogin.bind(this)}
                disabled={!this.state.valid}>
                {t('submit')}
              </button>
            </div>
            <div className="links text-center">
              <p>
                <span className="m-r-5">{t('do-not-have-account')}</span>
                <Link to="/register">{t('create-account')}</Link>
              </p>
            </div>
            <Loader loading={this.state.isLoading} text={t('signing-in')} />
          </LoadingOverlay>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify,
      loginSuccess
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(
  translate('translations')(Login)
)
