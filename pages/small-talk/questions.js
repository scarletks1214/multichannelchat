import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { bindActionCreators } from 'redux'
import Jumbotron from '../../elements/jumbotron'
import { SaveButton, Loader } from '../../components/global'
import { SmallTalkQuestionSet } from '../../components/small-talks'
import { IconAdd } from '../../assets/icons'
import { deleteSmallTalk } from '../../actions/smalltalks'

class SmallTalkQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.navInfo = [
      { url: '/workspaces', title: this.props.workspace.name },
      { url: '/smalltalk', title: 'Small Talk' }
    ]
    this.state = {
      smallTalks: this.props.smallTalks,
      categoryName: this.props.match.params.categoryName,
      trigger: 0
    }
  }

  handleQuestionSetAdd(e) {
    e.preventDefault()
    const { smallTalks, categoryName } = this.state
    smallTalks.push({
      questions: [],
      answers: [],
      categories: [categoryName]
    })
    this.setState({ smallTalks })
  }

  async handleQuestionSetRemove(index) {
    const { smallTalks } = this.state
    const { deleteSmallTalk } = this.props
    console.log('handleQuestionSetRemove ', index)

    let response = await deleteSmallTalk(
      this.props.workspace.id,
      smallTalks[index]
    )
    if (response && response.success) {
      smallTalks.splice(index, 1)
      this.setState({ smallTalks })
    }
  }

  handleQuestionSetUpdate(faq) {
    const { handleUpdate, workspace } = this.props
    this.smallTalks.push(faq)
    if (this.smallTalks.length === this.state.smallTalks.length) {
      handleUpdate(workspace.id, this.smallTalks)
    }
  }

  handleSave() {
    this.smallTalks = []
    this.setState({ trigger: this.state.trigger + 1 })
  }

  renderHeader() {
    let { t } = this.props
    return (
      <div className="header">
        <div className="title">
          <h3>{t(`${this.state.categoryName}`).toUpperCase()}</h3>
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

  render() {
    const { smallTalks, trigger } = this.state
    return (
      <div className="page faqs-page small-talk__page">
        <Jumbotron navInfo={this.navInfo} />
        <div className="page-content">{this.renderHeader()}</div>
        <div className="faq-qn-wrapper">
          <a
            onClick={this.handleQuestionSetAdd.bind(this)}
            className="new-entity">
            Add Question Set
            <img src={IconAdd} className="add-icon" alt="" />
          </a>
          {smallTalks.map((smallTalk, index) => (
            <SmallTalkQuestionSet
              smallTalk={smallTalk}
              key={index}
              index={index}
              isPosting={trigger}
              handleRemove={this.handleQuestionSetRemove.bind(this)}
              handleChange={this.handleQuestionSetUpdate.bind(this)}
            />
          ))}
        </div>
        <Loader loading={this.props.isLoading} text="Loading..." />
      </div>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     ...state.smalltalks,
//     workspace: state.workspace.workspace
//   }
// }

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteSmallTalk }, dispatch)

export default connect(null, mapDispatchToProps)(
  translate('translations')(SmallTalkQuestion)
)
