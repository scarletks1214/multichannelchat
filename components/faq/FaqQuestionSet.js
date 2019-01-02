import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { addNotification as notify } from 'reapop'

import { AddEditorComponent, SynonymComponent } from '../global'
import FaqProductTag from './FaqProductTag'
import FaqQuestionAlertModal from './FaqQuestionAlertModal'
import { IconAnswer, IconQuestion, IconTrash } from '../../assets/icons'
import { SaveButton, RemoveButton } from '../../components/global'
import {
  updateFaqQuestions,
  deleteFaqQuestion
} from '../../actions/faq'
import { showErrorNotification, showSuccessNotification } from '../../utils/helper'
import AutosizeTextarea from "react-textarea-autosize";

class FaqQuestionSet extends Component {
  constructor(props) {
    super(props)
    const { faq, products } = props
    this.state = { faq, products, isProductAlert: false, isExpanded: faq.changed }
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount', this.state.faq)
  // }

  handleQuestionAdd(question) {
    const { faq } = this.state
    this.props.handleChange(faq)
    faq.questions.push(question)
    faq.changed = true
    this.setState({ faq })
  }

  handleQuestionRemove(index) {
    const { faq } = this.state
    this.props.handleChange(faq)
    faq.questions.splice(index, 1)
    faq.changed = true
    this.setState({ faq })
  }

  handleQuestionChange(question, index) {
    const { faq } = this.state
    this.props.handleChange(faq)
    faq.questions[index] = question
    faq.changed = true
    this.setState({ faq })
  }

  handleAnswerChange(event) {
    const { faq } = this.state
    this.props.handleChange(faq)
    faq.answers[0] = event.target.value
    faq.changed = true
    this.setState({ faq })
  }

  handleProductChange(products) {
    const { faq } = this.state
    this.props.handleChange(faq)
    faq.products = products
    faq.changed = true
    this.setState({ faq })
  }

  handleSetRemove() {
    const { index } = this.props
    this.props.handleRemove(index)
  }

  async handleSave() {
    const { updateFaqQuestions, notify, workspaceId, afterUpdate } = this.props
    if (!this.state.faq.changed) {
      showErrorNotification(notify, 'No changes made')
    }
    if (this.state.faq.questions.length === 0) {
      showErrorNotification(notify, 'At least one question is required')
      return
    }
    if (this.state.faq.answers.length === 0 || this.state.faq.answers[0] === '') {
      showErrorNotification(notify, 'Answer is required')
      return
    }
    let response = await updateFaqQuestions(workspaceId, [this.state.faq])
    if (response.success) {
      showSuccessNotification(notify, 'Faqs have been successfully save')
    } else {
      showErrorNotification(notify, 'Something went wrong')
    }
    let faq = this.state.faq
    faq.changed = false
    this.setState({faq})
    afterUpdate(this.state.faq)
  }

  toggleProductAlert() {
    this.setState({ isProductAlert: !this.state.isProductAlert })
  }

  toggleExpanded() {
    if (this.state.isExpanded && this.state.faq.changed) {
      showErrorNotification(this.props.notify, 'Faq changed but not saved.')
      return
    }
    this.setState({isExpanded: !this.state.isExpanded})
  }

  renderCollapsed() {
    const { faq } = this.state
    return (
      <div className="collapsed">
        <div className="question-answer-wrapper">
          <div className="collapsed-row question"><IconQuestion/> <span>{faq.questions[0]}</span></div>
          <div className="collapsed-row answer"><IconAnswer/> <span>{faq.answers[0]}</span></div>
        </div>
        <div className="buttons-wrapper">
          <div className="view-less-expand view-more" onClick={this.toggleExpanded.bind(this)}>View More<i className="material-icons">navigate_next</i></div>
          <div className="remove" onClick={this.handleSetRemove.bind(this)}>
            <IconTrash/>
          </div>
        </div>
      </div>
    )
  }

  renderExpanded() {
    const { faq, products } = this.state
    return (
      <div className="expanded">
        <p>User asks:</p>
        <div className="faq-questions pl-4">
          <ul>
            {faq.questions.map((question, index) => (
              <li key={index}>
                <SynonymComponent
                  value={question}
                  index={index}
                  handleRemove={this.handleQuestionRemove.bind(this)}
                  handleChange={this.handleQuestionChange.bind(this)}
                />
              </li>
            ))}
          </ul>
          <AddEditorComponent
            placeholder="Add New Question here..."
            className=""
            hideIcon={true}
            handleDone={this.handleQuestionAdd.bind(this)}
          />
        </div>
        <hr />
        <p>Answers:</p>
        <div className="faq-answers pl-4">
          <AutosizeTextarea
            placeholder="Write answer..."
            value={faq.answers[0]}
            onChange={this.handleAnswerChange.bind(this)}
            rows="1"
          />
        </div>
        <p>Products:</p>
        <div className="faq-products">
          <FaqProductTag
            products={faq.products}
            productList={products}
            handleChange={this.handleProductChange.bind(this)}
            isMandatory={true}
            onMandatoryError={this.toggleProductAlert.bind(this)}
          />
        </div>
        <div className="view-less-expand view-less" onClick={this.toggleExpanded.bind(this)}>View Less<i className="material-icons">expand_more</i></div>
        <div className="bottom-buttons-container">
          <RemoveButton
            handleClick={this.handleSetRemove.bind(this)}
            className="btn-danger mr-2"
          />
          <SaveButton
            handleSave={this.handleSave.bind(this)}
            className="btn-primary"
            disabled={!this.state.faq.changed}
          />
        </div>
      </div>
    )
  }
  render() {
    const { isProductAlert } = this.state
    return (
      <div className="faq-question-set faq-smalltalk-question-set">
        {isProductAlert && <FaqQuestionAlertModal toggleProductAlert={this.toggleProductAlert.bind(this)}/>}
        {this.state.isExpanded ? this.renderExpanded() : this.renderCollapsed()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateFaqQuestions,
      deleteFaqQuestion,
      notify
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(
  translate('translations')(FaqQuestionSet)
)
