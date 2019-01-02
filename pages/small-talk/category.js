import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { SaveButton, AddEditorComponent, Loader } from '../../components/global'
import Jumbotron from '../../elements/jumbotron'
class SmallTalkCategories extends Component {
  constructor(props) {
    super(props)
    this.navInfo = [{ url: '/workspaces', title: this.props.workspace.name }]
    this.state = { categories: this.props.categories }
  }

  handleCategoryAdd(category) {
    const { categories } = this.state
    categories.push({ name: category })
    this.setState({ categories })
  }

  handleSave() {
    const { workspace, handleUpdate } = this.props
    const { categories } = this.state

    handleUpdate(workspace.id, categories.map(category => category.name))
  }

  renderHeader() {
    let { translate } = this.props
    return (
      <div className="header">
        <div className="title">
          <h3>{translate('small talk').toUpperCase()}</h3>
        </div>
        <div className="buttons">
          <SaveButton
            handleSave={this.handleSave.bind(this)}
            className="btn-primary entity-list-save"
          />
          <span className="float-right mr-3">Last Modified Date</span>
        </div>
      </div>
    )
  }

  renderDescription() {
    return (
      <div className="faq-description">
        <p>
          Your agent can learn how to support small talk without any extra
          development. By default, it will respond with predefined phrases. Use
          the form below to customize responses to the most popular requests.
        </p>
        <p className="faq-example">
          Eample: <br />
          <span> User: How are you?</span>
          <br />
          <span>Agent: Wonderful as always. Thanks for asking.</span>
          <br />
          <br />
          <span>User: You're so sweet.</span>
          <br />
          <span>Agent: Thanks! The feeling is mutual.</span>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="page faqs-page small-talk__page">
        <Jumbotron navInfo={this.navInfo} />
        <div className="page-content">
          {this.renderHeader()}
          {this.renderDescription()}
          <div className="small-talk__wrapper">
            <AddEditorComponent
              placeholder="Add New Category"
              className="new-entity"
              handleDone={this.handleCategoryAdd.bind(this)}
            />
            <ul className="small-talk__categories">
              {this.state.categories.map((value, index) => (
                <li key={index}>
                  <Link to={`/smalltalk/${value.name}`}>{value.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Loader loading={this.props.isLoading} text="Loading..." />
        </div>
      </div>
    )
  }
}
export default SmallTalkCategories
