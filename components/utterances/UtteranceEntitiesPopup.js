import React, { Component } from 'react'
import { addNotification as notify } from 'reapop'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import enhanceWithClickOutside from 'react-click-outside'
import {
  validateWithRegEx,
  NAME_VALIDATION_REGEX
} from '../../utils/Validations'

class UtteranceEntitiesPopup extends Component {
  renderExistingEntities() {
    let entities = [...this.props.entities]
    if (this.props.entityValue !== '') {
      try {
        let regex = new RegExp(this.props.entityValue, 'i')
        entities = entities.filter(entity => regex.test(entity.name))
      } catch (err) {
        entities = []
      }
    }
    if (this.props.entities === 0) {
      return (
        <div>
          <i>
            <span>No existing entities</span>
          </i>
        </div>
      )
    }
    if (entities && entities.length > 0) {
      return entities.map((entity, index) => (
        <div key={index} className="entity-item">
          <a onClick={this.handleSelectEntity.bind(this)}>{entity.name}</a>
        </div>
      ))
    }
    return (
      <div>
        <i>
          <span>No matching entities</span>
        </i>
      </div>
    )
  }

  handleSelectEntity(event) {
    this.props.handleEntitySubmit(event.currentTarget.text, false)
  }

  handleClickOutside() {
    if (this.props.handleClickOutside) {
      this.props.handleClickOutside()
    }
  }
  handleEntitySubmit(event) {
    if (this.props.entityValue !== '') {
      let isNew = !this.props.entities.find(
        entity => entity.name === this.props.entityValue
      )

      if (!validateWithRegEx(this.props.entityValue, NAME_VALIDATION_REGEX)) {
        let { notify } = this.props
        notify({
          title: 'Invalid Entity',
          message: 'Input value is not eligible for entity',
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      } else {
        this.props.handleEntitySubmit(this.props.entityValue, isNew)
      }
      // }
    }
  }
  render() {
    return (
      <div
        className="utterance-entity-popup utterance-popup"
        style={{
          top: this.props.top,
          left: this.props.left,
          display: this.props.isVisible ? 'block' : 'none'
        }}>
        <div className="existing-entity-list">
          {this.renderExistingEntities()}
        </div>
        <div className="btn-add-container">
          <button
            className="btn btn-info btn-rounded btn-icon btn-sm btn-add"
            onClick={this.handleEntitySubmit.bind(this)}>
            <i className="ion-icon ion-icon-2x ion-ios-plus-empty" />
            <span>add</span>
          </button>
        </div>
      </div>
    )
  }
}

UtteranceEntitiesPopup.defaultProps = {
  text: ''
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(
  enhanceWithClickOutside(UtteranceEntitiesPopup)
)
