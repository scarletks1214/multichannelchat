import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { translate } from 'react-i18next'
import { addNotification as notify } from 'reapop'

import {
  loadFaqs,
  updateFaqProducts,
  updateFaqQuestions,
  deleteFaqQuestion
} from '../../actions/faq'
import { Loader } from '../../components/global'

import FaqProduct from './product'
import FaqQuestion from './question'

class FaqPage extends Component {
  componentDidMount() {
    const { loadFaqs, workspaceId, isLoaded } = this.props
    if (isLoaded) return
    loadFaqs(workspaceId)
  }

  render() {
    const {
      match: { url },
      workspaceId,
      workspaceName,
      isLoading,
      isLoaded,
      products,
      faqs,
      updateFaqProducts,
      updateFaqQuestions,
      deleteFaqQuestion,
      notify,
      history
    } = this.props
    return isLoaded ? (
      <Switch>
        <Route
          exact
          path={url}
          render={() => (
            <FaqProduct
              products={products}
              faqs={faqs}
              handleUpdate={updateFaqProducts}
              workspaceId={workspaceId}
              workspaceName={workspaceName}
              isLoading={isLoading}
              notify={notify}
              history={history}
            />
          )}
        />
        <Route
          path={`${url}/:productName`}
          render={props => (
            <FaqQuestion
              faqs={faqs}
              products={products}
              isLoading={isLoading}
              handleUpdate={updateFaqQuestions}
              handleDelete={deleteFaqQuestion}
              workspaceId={workspaceId}
              workspaceName={workspaceName}
              productName={props.match.params.productName}
            />
          )}
        />
      </Switch>
    ) : (
      <div className="loader-container">
        <Loader loading={true} text="Loading FAQ..." />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.faq,
    workspaceId: state.workspace.workspace.id,
    workspaceName: state.workspace.workspace.name
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFaqs,
      updateFaqProducts,
      updateFaqQuestions,
      deleteFaqQuestion,
      notify
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(FaqPage)
)
