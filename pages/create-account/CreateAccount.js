import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import approve from 'approvejs'
import ReCAPTCHA from 'react-google-recaptcha'
import { addNotification as notify } from 'reapop'
import Form from '../Form'
import InputGroup1 from '../InputGroup1'
import { GOOGLE_RECAPTCHA_KEY } from '../../config/constants'
import { signup } from '../../utils/ApiManager'
import { Loader, LoadingOverlay } from '../../components/global/loader'

class CreateAccount extends Component {
  constructor(props) {
    super(props)
    const { t } = this.props
    this.state = {
      valid: false,
      captchaToken: null,
      success: false,
      isLoading: false,
      fields: [
        {
          value: '',
          name: 'firstName',
          type: 'text',
          errors: [],
          placeholder: t('first-name'),
          rules: {
            title: t('first-name'),
            required: true
          }
        },
        {
          value: '',
          name: 'lastName',
          type: 'text',
          errors: [],
          placeholder: t('last-name'),
          rules: {
            title: t('last-name'),
            required: true
          }
        },
        {
          value: '',
          name: 'emailId',
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
          name: 'phoneNo',
          type: 'text',
          errors: [],
          placeholder: t('phone-no'),
          rules: {
            title: t('phone-no'),
            required: true
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
        },
        {
          value: '',
          name: 'confirm_password',
          type: 'password',
          errors: [],
          placeholder: t('confirm-password'),
          rules: {
            title: t('confirm-password'),
            equal: {
              value: '',
              field: 'Password'
            }
          }
        }
      ]
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { currentUser, loginError } = this.props
    const newUser = nextProps.currentUser
    const newError = nextProps.loginError

    if (newUser && newUser !== currentUser) {
      this.props.history.push('/admin')
    } else if (newError !== loginError) {
      const errors = []
      if (newError) {
        errors.push({ message: 'Incorrect username or password' })
      }
      this.setState({ errors })
    }
  }

  handleChange(event) {
    let fields = this.state.fields
    fields.forEach(field => {
      if (field.name === event.currentTarget.name) {
        field.value = event.currentTarget.value
        field.errors = []
      }
      if (
        event.currentTarget.name === 'password' &&
        field.name === 'confirm_password'
      ) {
        field.rules.equal.value = event.currentTarget.value
        field.errors = []
      }
    })
    this.setState({ fields, valid: true })
  }

  handleRecaptchaChange(value) {
    this.setState({ captchaToken: value })
  }

  async handleSignup(event) {
    let fields = this.state.fields
    let { t } = this.props
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
      const { notify } = this.props
      if (this.state.captchaToken) {
        try {
          this.setState({ isLoading: true })
          let response = await signup({
            firstName: this.state.fields[0].value,
            lastName: this.state.fields[1].value,
            emailId: this.state.fields[2].value,
            phoneNo: this.state.fields[3].value,
            password: this.state.fields[4].value,
            captchaToken: this.state.captchaToken
          })
          if (response.success) {
            this.setState({ success: true, isLoading: false })
          } else {
            this.setState({ isLoading: false, captchaToken: null })
            this.refs.recaptcha.reset()
            notify({
              title: `Error`,
              message: t(`${response.statusMsg}`),
              status: 'error',
              position: 'tr',
              dismissible: true
            })
          }
        } catch (err) {
          this.setState({ isLoading: false, captchaToken: null })
          this.refs.recaptcha.reset()
          notify({
            title: `Error`,
            message: `${err.message}`,
            status: 'error',
            position: 'tr',
            dismissible: true
          })
        }
      } else {
        notify({
          title: `Recaptcha required`,
          message: `Please check recaptcha`,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      }
    }
  }
  render() {
    let { fields } = this.state
    let { t } = this.props
    return (
      <div className="page login-register-page signup-page">
        <h2>{t('sign-up')}</h2>
        {this.state.success ? (
          <Form description={t('verify-your-email-address')}>
            <div>{t('verification-email-message')}</div>
          </Form>
        ) : (
          <LoadingOverlay>
            <Form>
              <div className="row">
                <InputGroup1
                  field={fields[0]}
                  onChange={this.handleChange.bind(this)}
                  addtClassName="col-12 col-lg-6"
                />
                <InputGroup1
                  field={fields[1]}
                  onChange={this.handleChange.bind(this)}
                  addtClassName="col-12 col-lg-6"
                />
              </div>
              <div className="row">
                <InputGroup1
                  field={fields[2]}
                  onChange={this.handleChange.bind(this)}
                  addtClassName="col-12 col-lg-6"
                />
                <InputGroup1
                  field={fields[3]}
                  onChange={this.handleChange.bind(this)}
                  addtClassName="col-12 col-lg-6"
                />
              </div>
              <div className="row">
                <InputGroup1
                  field={fields[4]}
                  onChange={this.handleChange.bind(this)}
                  addtClassName="col-12 col-lg-6"
                />
                <InputGroup1
                  field={fields[5]}
                  onChange={this.handleChange.bind(this)}
                  addtClassName="col-12 col-lg-6"
                />
              </div>
              <div className="row justify-content-center mt-4">
                <div className="col-auto">
                  <ReCAPTCHA
                    ref="recaptcha"
                    sitekey={GOOGLE_RECAPTCHA_KEY}
                    onChange={this.handleRecaptchaChange.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group text-center mt-3">
                <button
                  className="btn btn-primary pr-4 pl-4"
                  type="submit"
                  onClick={this.handleSignup.bind(this)}
                  disabled={!this.state.valid || this.state.isLoading}>
                  {t('submit')}
                </button>
              </div>
              <div className="links text-center">
                <p>
                  <span className="m-r-5">{t('already-have-account')}</span>
                  <Link to="/login">{t('sign-in')}</Link>
                </p>
              </div>
            </Form>
            <Loader loading={this.state.isLoading} text={t('signing-up')} />
          </LoadingOverlay>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {}
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify
    },
    dispatch
  )

export default translate('translations')(
  connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
)
