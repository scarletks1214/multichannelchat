import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import Pagination from 'react-js-pagination'
import { Prompt } from 'react-router'
import Jumbotron from '../../elements/jumbotron'
import { SaveButton, Loader } from '../../components/global'
import { FaqQuestionSet } from '../../components/faq'
import { showErrorNotification, showSuccessNotification } from '../../utils/helper'
import DeleteConfirmModal from '../../components/global/DeleteConfirmModal'

import {
  updateFaqQuestions,
  deleteFaqQuestion
} from '../../actions/faq'

class FaqQuestion extends React.Component {
  constructor(props) {
    super(props)

    const { faqs, productName } = props

    this.navInfo = [
      { url: '/workspaces', title: props.workspaceName },
      { url: '/faqs', title: 'Faq' },
      { url: '', title: productName }
    ]

    this.orgFaqs = faqs.reduce(
      (result, faq) => {
        if (faq.products.includes(productName)) {
          result.owned.push(faq)
        } else {
          result.others.push(faq)
        }
        return result
      },
      { owned: [], others: [] }
    )

    this.state = {
      faqs: this.orgFaqs.owned.map((faq, index) => ({
        ...faq,
        key: `${faq.id}`
        // key: `${index}_${new Date().getTime()}`
      })),
      productName: productName,
      trigger: 0,
      showDeleteModal: false,
      currentFaq: null,
      currentFaqIndex: -1,
      showSearch: false,
      searchQuery: '',
      activePage: 1,
      itemsCountPerPage: localStorage.getItem('question-itemCountPerPage') || 5,
      filteredCount: this.orgFaqs.owned.length,
      changedQuestions: []
    }
  }

  handleQuestionSetAdd(e) {
    e.preventDefault()
    const { faqs, productName } = this.state
    this.setState({
      faqs: [
        {
          questions: [],
          answers: [],
          products: [productName],
          key: `new__${new Date().getTime()}`,
          changed: true,
        },
        ...faqs
      ]
    })
    this.updatePageSetting()
  }

  handleQuestionChanged(faq) {
    let changedQuestions = this.state.changedQuestions
    if (!changedQuestions.includes(faq.key)) {
      changedQuestions.push(faq.key)
      this.setState({changedQuestions})
    }
  }

  async handleQuestionSetRemove(index) {
    this.setState({showDeleteModal: true, currentFaq: this.state.faqs[index], currentFaqIndex: index})
  }

  async handleRemoveFaq() {
    const { deleteFaqQuestion, workspaceId, notify } = this.props
    try {
      const faqs = [...this.state.faqs]
      faqs.splice(this.state.currentFaqIndex, 1)
      if (this.state.currentFaq.id) {
        let response = await deleteFaqQuestion(workspaceId, this.state.currentFaq.id)
        if (response.success) {
          this.setState({faqs: faqs})
          showSuccessNotification(notify, 'Successfuly deleted question')
        } else {
          showErrorNotification(notify, 'Failed to delete question')
        }
      } else {
        this.setState({faqs: faqs})
        showSuccessNotification(notify, 'Faq successfuly removed')
      }
    } catch (err) {
      console.log('handleRemoveFaq Error', err)
      showErrorNotification(notify, 'Failed to delete question')
    }
    this.updatePageSetting()
  }

  updateFaqItemAtIndex(faq) {
    const { faqs, changedQuestions } = this.state
    let changedIndex = changedQuestions.findIndex(cq => cq === faq.key)
    if (changedIndex > -1) {
      changedQuestions.splice(changedIndex, 1)
    }
    let index = faqs.findIndex(fq => fq.key === faq.key)
    if (index > -1) {
      if (!faqs[index].id) {
        faq.key = faq.id
      }
      faqs.splice(index, 1, faq)
    }
    this.setState({faqs, changedQuestions})
  }

  async handleSave() {
    const { updateFaqQuestions, notify, workspaceId } = this.props
    let { faqs, changedQuestions } = this.state
    if (changedQuestions.length === 0) {
      showErrorNotification(notify, 'No changes made')
    }

    let isError = false
    let faqsToUpdate = faqs.filter(faq => {
      let hasChanged = changedQuestions.includes(faq.key)
      if (faq.questions.length === 0) {
        isError = true
      }
      if (faq.answers.length === 0 || faq.answers[0] === '') {
        isError = true
      }
      return hasChanged
    })
    if (isError) {
      showErrorNotification(notify, 'There are some invalid question. Faq neeeds at least one question and answer should not be empty')
      return
    }
    let response = await updateFaqQuestions(workspaceId, faqsToUpdate)
    if (response.success) {
      faqs.forEach(faq => {
        faq.changed = false
      })
      for (var i = 0; i < faqsToUpdate.length; i++) {
        let faq = faqsToUpdate[i]
        if (!faq.id) {
          faq.id = response.response.faqs[i].id
          faq.key = response.response.faqs[i].id
        }
      }
      this.setState({faqs, changedQuestions: []})
      showSuccessNotification(notify, 'Faqs have been successfully save')
    } else {
      showErrorNotification(notify, 'Something went wrong')
    }
  }

  handleSearch(event) {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer)
      this.searchTimer = null
    }
    if (event.key === 'Escape') {
      this.setState({ searchQuery: '', showSearch: false })
    } else {
      const searchValue = event.currentTarget.value
      this.searchTimer = setTimeout(() => {
        this.searchTimer = null
        this.setState({ searchQuery: searchValue })
        this.updatePageSetting()
      }, 300)
    }
  }

  handlePageChange(activePage) {
    this.setState({ activePage })
  }

  handlePageLimitChange(event) {
    const itemsCountPerPage = event.target.value
    this.setState({ itemsCountPerPage })
    localStorage.setItem('question-itemCountPerPage', itemsCountPerPage)
  }

  updatePageSetting() {
    const { faqs, showSearch, searchQuery } = this.state

    let query = searchQuery ? searchQuery.toLocaleLowerCase() : ''
    const filteredFaqs = faqs.filter(
      faq =>
        !showSearch || searchQuery=== '' || faq.answers.join(',').toLowerCase().includes(query) ||
        faq.questions.join(',').toLowerCase().includes(query)
    )

    this.setState({ filteredCount: filteredFaqs.length, activePage: 1 })
  }

  renderToolbar() {
    return (
      <div className="d-flex color-primary page-toolbar">
        <div className="add-new-wrapper mb-5">
          <a
            onClick={this.handleQuestionSetAdd.bind(this)}
            className="new-question-set">
            Add Question Set
          </a>
        </div>
        <div className="form-group form-inline">
          <span className="m-r-10">Show</span>
          <select
            className="custom-select m-r-10"
            value={this.state.itemsCountPerPage}
            onChange={this.handlePageLimitChange.bind(this)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          {this.state.showSearch ? (
            <div>
              <div className="input-group search-button-container">
                <span className="input-group-addon rounded-left">
                  <i className="fa fa-search" />
                </span>
                <input
                  type="text"
                  className="form-control rounded-right"
                  placeholder="Type something..."
                  onKeyUp={this.handleSearch.bind(this)}
                />
                <a className="ml-2">
                  <i
                    className="ion-icon ion-icon-2x ion-close"
                    onClick={() =>
                      this.setState({ showSearch: false, searchQuery: '' })
                    }
                  />
                </a>
              </div>
            </div>
          ) : (
            <a>
              <i
                className="ion-icon ion-icon-2x ion-ios-search-strong"
                onClick={() => this.setState({ showSearch: true })}
              />
            </a>
          )}
        </div>
      </div>
    )
  }
  renderHeader() {
    // let { t } = this.props
    return (
      <div className="header">
        <div className="title">
        </div>
        {this.state.changedQuestions.length > 0 &&
          <div className="buttons">
            <SaveButton
              handleSave={this.handleSave.bind(this)}
              className="btn-primary questions-save"
            />
          </div>
        }
      </div>
    )
  }

  showFilteredResult() {
    const {
      faqs,
      showSearch,
      searchQuery,
      activePage,
      itemsCountPerPage
    } = this.state
    const { products, workspaceId } = this.props
    let query = searchQuery ? searchQuery.toLocaleLowerCase() : ''
    const filteredFaqs = faqs.filter(
      faq =>
        !showSearch || searchQuery=== '' || faq.answers.join(',').toLowerCase().includes(query) ||
        faq.questions.join(',').toLowerCase().includes(query)
    )

    const start = (activePage - 1) * itemsCountPerPage
    const end = activePage * itemsCountPerPage

    return filteredFaqs
      .slice(start, end)
      .map((faq, index) => (
        <FaqQuestionSet
          faq={faq}
          products={products}
          workspaceId={workspaceId}
          key={faq.key}
          index={index}
          handleRemove={this.handleQuestionSetRemove.bind(this)}
          handleChange={this.handleQuestionChanged.bind(this)}
          afterUpdate={this.updateFaqItemAtIndex.bind(this)}
        />
      ))
  }

  render() {
    const { activePage, itemsCountPerPage, filteredCount } = this.state
    return (
      <div className="page faqs-page">
        <Jumbotron navInfo={this.navInfo} />
        <div className="page-content">
          {this.renderHeader()}
          {this.renderToolbar()}
          <div className="faq-qn-wrapper">
              {this.showFilteredResult()}
              <div className="d-flex justify-content-center">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={filteredCount}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  innerClass="pagination pagination-primary"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
          </div>
        </div>
        {this.state.showDeleteModal && (
          <DeleteConfirmModal
            showModal={this.state.showDeleteModal}
            onCancel={() =>
              this.setState({
                showDeleteModal: false,
                currentFaq: null
              })
            }
            onDelete={this.handleRemoveFaq.bind(this)}
          />
        )}
        <Loader loading={this.props.isLoading} text="Saving..." />
        <Prompt
          when={this.state.changedQuestions.length > 0}
          message="There are unsaved questions. Are you sure you want to leave without save?"
        />
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ loadFaqs, updateFaqProducts }, dispatch)

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
  translate('translations')(FaqQuestion)
)
