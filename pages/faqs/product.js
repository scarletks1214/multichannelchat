import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import { Prompt } from 'react-router'
import { bindActionCreators } from 'redux'
import { addNotification as notify } from 'reapop'
import {
  updateFaqProducts,
} from '../../actions/faq'

import Jumbotron from '../../elements/jumbotron'
import {
  SynonymComponent,
  AddEditorComponent,
  SaveButton,
  Loader
} from '../../components/global'
import { FaqSearch } from '../../components/faq'
import { showErrorNotification, showSuccessNotification } from '../../utils/helper'

class FaqProduct extends Component {
  constructor(props) {
    super(props)
    const { products, workspaceName } = props
    this.navInfo = [
      { url: '/workspaces', title: workspaceName },
      { title: 'Faqs' }
    ]

    this.state = { products, formEdited: false }
  }

  handleNewProduct(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()

      const { products } = this.state
      const name = event.target.value
      event.target.value = ''
      products.push({ name, synonyms: [] })
      this.setState({ products, formEdited: true })
    }
  }

  handleProductRemove(index) {
    const { notify, faqs } = this.props
    const { products } = this.state
    const selectedProduct = products[index]
    if (
      faqs.filter(faq => faq.products.includes(selectedProduct.name)).length
    ) {
      notify({
        title: `Error`,
        message: 'You can not delete product which is used in FAQs',
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    } else {
      products.splice(index, 1)
      this.setState({ products, formEdited: true })
    }
  }

  handleNewSynonym(newSynonym, index) {
    const { products } = this.state
    products[index].synonyms.push(newSynonym)
    this.setState({ products, formEdited: true })
  }

  handleSynonymChange(index, subIndex, newSynonym) {
    const { products } = this.state
    products[index].synonyms[subIndex] = newSynonym
    this.setState({ products, formEdited: true })
  }

  handleSynonymRemove(index, subIndex) {
    const { products } = this.state
    products[index].synonyms.splice(subIndex, 1)
    this.setState({ products, formEdited: true })
  }

  async handleSave() {
    const { handleUpdate, workspaceId, notify } = this.props
    const { products } = this.state
    let response = await handleUpdate(workspaceId, products)
    if (response.success) {
      this.setState({ formEdited: false })
      showSuccessNotification(notify, 'Successfully saved products')
    } else {
      showErrorNotification(notify, 'Failed to save product')
    }
  }

  renderHeader() {
    let { t } = this.props
    return (
      <div className="header">
        <div className="title">
          <h3>{t('faqs').toUpperCase()}</h3>
        </div>
        <div className="buttons">
          <SaveButton
            handleSave={this.handleSave.bind(this)}
            className="btn-primary entity-list-save"
          />
        </div>
      </div>
    )
  }

  renderDescription() {
    return (
      <div className="faq-description">
        <p>
          Your agent can learn how to answer complex questions so that customers
          can have an easy way of learning about your product. Use the form
          below to customize responses to the most popular queries.
        </p>
        <p className="faq-example">
          Eample: <br />
          <span>User: How can I transfer?</span>
          <br />
          <span>Agent: You can transfer through the NEFT system …</span>
        </p>
      </div>
    )
  }

  render() {
    const { faqs, history } = this.props
    const { products } = this.state
    return (
      <div className="page faqs-page">
        <Jumbotron navInfo={this.navInfo} />
        <div className="page-content">
          {this.renderHeader()}
          {this.renderDescription()}
          <div className="faq-product-wrapper">
            <div className="d-flex justify-content-between">
              <input
                type="text"
                name="new-product"
                className="new-product"
                placeholder="Add product here..."
                autoComplete="off"
                onKeyDown={this.handleNewProduct.bind(this)}
              />
              <FaqSearch faqs={faqs} history={history} />
            </div>
            <div className="product-lists list mt-4">
              <div className="product-row header">
                <div className="column-name">Name</div>
                <div className="column-synonym">Synonyms</div>
              </div>
              <div className="contents">
                {products.map((value, index) => (
                  <div className="product-row" key={index}>
                    <div className="column-name">
                      <Link to={`/faqs/${value.name}`}>{value.name}</Link>
                      <i
                        className="fa fa-trash"
                        onClick={() => this.handleProductRemove(index)}
                      />
                    </div>
                    <div className="column-synonym">
                      <div className="synonyms-wrapper">
                        {value.synonyms.map((synonym, key) => (
                          <SynonymComponent
                            value={synonym}
                            key={key}
                            index={key}
                            handleChange={(newSynonym, subIndex) =>
                              this.handleSynonymChange(
                                index,
                                subIndex,
                                newSynonym
                              )
                            }
                            handleRemove={subIndex =>
                              this.handleSynonymRemove(index, subIndex)
                            }
                          />
                        ))}
                        <AddEditorComponent
                          placeholder="Add synonyms..."
                          className="new-synonym"
                          hideIcon={true}
                          handleDone={newSynonym =>
                            this.handleNewSynonym(newSynonym, index)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Loader loading={this.props.isLoading} text="Saving..." />
          <Prompt
            when={this.state.formEdited}
            message="Products edited but not saved. Are you sure you want to leave without save?"
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateFaqProducts,
      notify
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(
  translate('translations')(FaqProduct)
)
