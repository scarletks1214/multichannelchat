import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { translate } from 'react-i18next'
// import { Prompt } from 'react-router'

import {
  loadSmallTalks,
  updateCategories,
  updateSmallTalks
} from '../../actions/smalltalks'
import { Loader } from '../../components/global'

import SmallTalksCategories from './category'
import SmallTalksQuestions from './questions'
class SmallTalkPage extends Component {
  componentDidMount() {
    const { loadSmallTalks, workspace, isLoaded } = this.props
    if (isLoaded) return
    loadSmallTalks(workspace.id)
  }

  render() {
    const {
      match: { url },
      workspace,
      isLoading,
      isLoaded,
      categories,
      smallTalks,
      updateCategories,
      updateSmallTalks,
      t: translate
    } = this.props
    return isLoaded ? (
      <div>
        <Switch>
          <Route
            exact
            path={url}
            render={() => (
              <SmallTalksCategories
                categories={categories}
                smallTalks={smallTalks}
                handleUpdate={updateCategories}
                workspace={workspace}
                isLoading={isLoading}
                translate={translate}
              />
            )}
          />
          <Route
            path={`${url}/:categoryName`}
            render={props => (
              <SmallTalksQuestions
                smallTalks={smallTalks.filter(smallTalk =>
                  smallTalk.categories.includes(props.match.params.categoryName)
                )}
                isLoading={isLoading}
                handleUpdate={updateSmallTalks}
                workspace={workspace}
                {...props}
              />
            )}
          />
        </Switch>
        {/* <Prompt
        when={true}
        message={location => (
          location.pathname.startsWith('/smalltalk') ? true : 'Small Talk edited but not saved. Are you sure you want to leave without save?'
        )}
      /> */}
      </div>
    ) : (
      <div className="loader-container">
        <Loader loading={true} text="Loading Data..." />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.smalltalks,
    workspace: state.workspace.workspace
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { loadSmallTalks, updateCategories, updateSmallTalks },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(SmallTalkPage)
)
