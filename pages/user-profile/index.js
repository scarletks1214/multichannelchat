import React, { Component } from 'react'
// import UserProfileTop from './UserProfileTop'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { translate } from 'react-i18next'
import _ from 'lodash'
import { updateProfile, updatePassword } from '../../actions/authActions'
import { addNotification as notify } from 'reapop'
import { Loader } from '../../components/global/loader'
import { handleResponseError } from '../../utils/ApiManager'

class UserEditProfile extends Component {
  constructor(props) {
    super(props)
    const { t } = this.props
    this.toggle = this.toggle.bind(this)
    this.state = {
      valid: false,
      user: _.pick(this.props.currentUser, [
        'firstName',
        'lastName',
        'company',
        'phoneNumber'
      ]),
      passwordFields: {
        password: '',
        confirmPassword: '',
        oldPassword: ''
      },
      fields: [
        {
          name: 'firstName',
          value: '',
          type: 'text',
          errors: [],
          rules: {
            title: t('first-name'),
            required: true
          }
        },
        {
          name: 'lastName',
          value: '',
          type: 'text',
          errors: [],
          rules: {
            title: t('last-name'),
            required: true
          }
        },
        {
          name: 'company',
          value: '',
          type: 'text',
          errors: [],
          rules: {
            title: t('company-name'),
            required: false
          }
        },
        {
          name: 'phoneNumber',
          value: '',
          type: 'text',
          errors: [],
          rules: {
            title: t('phone-no'),
            required: true
          }
        }
      ]
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  updateUserField(event) {
    let user = this.state.user
    user[event.target.name] = event.target.value
    this.setState({ user })
  }
  updatePasswordField(event) {
    let passwordFields = this.state.passwordFields
    passwordFields[event.target.name] = event.target.value
    this.setState({ passwordFields })
  }
  renderField(field) {
    return (
      <div className="input-field-container" key={field.name}>
        <span className="input-label">{field.rules.title}</span>
        <div className="input-wrapper">
          <input
            type="text"
            name={field.name}
            className="input-field input-no-focus-outline"
            value={this.state.user[field.name]}
            onChange={this.updateUserField.bind(this)}
            required={field.rules.required}
          />
        </div>
      </div>
    )
  }
  renderPasswordField(field) {
    const { t } = this.props
    return (
      <div className="input-field-container password-fields">
        <span className="input-label">Password</span>
        <div className="input-wrapper">
          <input
            type="password"
            name="oldPassword"
            className="input-field input-no-focus-outline"
            value={this.state.passwordFields.oldPassword}
            onChange={this.updatePasswordField.bind(this)}
            placeholder={t('enter-old-password')}
          />
          <input
            type="password"
            name="password"
            className="input-field input-no-focus-outline"
            value={this.state.passwordFields.password}
            onChange={this.updatePasswordField.bind(this)}
            placeholder={t('enter-new-password')}
          />
          <input
            type="password"
            name="confirmPassword"
            className="input-field input-no-focus-outline"
            value={this.state.passwordFields.confirmPassword}
            onChange={this.updatePasswordField.bind(this)}
            placeholder={t('enter-confirm-password')}
          />
          <span>{t('leave-password-blank-message')}</span>
        </div>
      </div>
    )
  }

  async handleSubmit() {
    const { notify } = this.props
    if (
      this.state.passwordFields.password !== '' ||
      this.state.passwordFields.oldPassword !== '' ||
      this.state.passwordFields.confirmPassword
    ) {
      let errorMessage
      if (this.state.passwordFields.oldPassword === '') {
        errorMessage = 'You need to provide old password'
      }
      if (this.state.passwordFields.password === '') {
        errorMessage = 'You need to provide new password'
      }
      if (
        this.state.passwordFields.password !==
        this.state.passwordFields.confirmPassword
      ) {
        errorMessage = 'Confirm password does not match with new password'
      }
      if (errorMessage) {
        notify({
          title: `Error`,
          message: errorMessage,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
        return
      }
      this.updatePassword()
    }
    this.updateProfile()
  }
  async updateProfile() {
    const { updateProfile, notify, t } = this.props
    try {
      let response = await updateProfile(this.state.user)
      if (response.success) {
        notify({
          title: `Success`,
          message: 'Profile updated successfully',
          status: 'info',
          position: 'tr',
          dismissible: true
        })
        return
      } else {
        handleResponseError(response, 'Failed to udpate profile', notify, t)
      }
    } catch (err) {
      console.log('Update Profile Error: ', err)
      notify({
        title: `Error`,
        message: 'Failed to update profile',
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  async updatePassword() {
    const { updatePassword, notify, t } = this.props
    try {
      let response = await updatePassword(
        this.state.passwordFields.oldPassword,
        this.state.passwordFields.password
      )
      if (response.success) {
        notify({
          title: `Success`,
          message: 'Password updated successfully',
          status: 'info',
          position: 'tr',
          dismissible: true
        })
        this.setState({
          passwordFields: { password: '', oldPassword: '', confirmPassword: '' }
        })
      } else {
        handleResponseError(response, 'Failed to udpate password', notify, t)
      }
    } catch (err) {
      console.log('Update Password Error: ', err)
      notify({
        title: `Error`,
        message: `Failed to update password: ${err}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }
  render() {
    const { t } = this.props
    return (
      <div className="page profile-page">
        <div className="page-content">
          <div className="header">
            <h3>{t('profile')}</h3>
          </div>
          <div className="main-area">
            {/* <div className="info-text">{t('profile-page-message1')}</div> */}
            <div className="inputs-list">
              {this.state.fields.map(field => this.renderField(field))}
              {this.renderPasswordField()}
            </div>
            <div className="buttons text-right pr-5 mb-3">
              <button
                className={'btn btn-dark pr-5 pl-5 btn-rounded'}
                onClick={this.handleSubmit.bind(this)}>
                {t('update')}
              </button>
            </div>
          </div>
        </div>
        <Loader loading={this.props.isLoading} text={t('updating')} fullPage />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.auth.user,
    isLoading: state.auth.isLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateProfile,
      updatePassword,
      notify
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(UserEditProfile)
)
