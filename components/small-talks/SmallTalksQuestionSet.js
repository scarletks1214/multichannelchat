import React, { Component } from 'react'

import { AddEditorComponent, SynonymComponent, AutosizeInput } from '../global'

class SmallTalksQuestionSet extends Component {
  constructor(props) {
    super(props)
    const { smallTalk } = props
    this.state = { smallTalk }
  }

  componentWillReceiveProps(nextProps) {
    const { handleChange, isPosting } = nextProps
    if (this.props.isPosting !== isPosting) {
      const { smallTalk } = this.state
      console.log('SENDING STATE TO PARENT')
      handleChange(smallTalk)
    }
  }

  // handleQuestionAdd(question) {
  //   const { smallTalk } = this.state
  //   smallTalk.questions.push(question)
  //   this.setState({ smallTalk })
  // }

  // handleQuestionRemove(index) {
  //   const { smallTalk } = this.state
  //   smallTalk.questions.splice(index, 1)
  //   this.setState({ smallTalk })
  // }

  handleQuestionChange(event) {
    const { smallTalk } = this.state
    smallTalk.questions[0] = event.currentTarget.value
    this.setState({ smallTalk })
  }

  handleAnswerAdd(answer) {
    const { smallTalk } = this.state
    smallTalk.answers.push(answer)
    this.setState({ smallTalk })
  }

  handleAnswerRemove(index) {
    const { smallTalk } = this.state
    smallTalk.answers.splice(index, 1)
    this.setState({ smallTalk })
  }

  handleAnswerChange(answer, index) {
    const { smallTalk } = this.state
    smallTalk.answers[index] = answer
    this.setState({ smallTalk })
  }

  handleSetRemove() {
    const { index } = this.props
    this.props.handleRemove(index)
  }

  render() {
    const { smallTalk } = this.state
    let question =
      smallTalk.questions && smallTalk.questions.length > 0
        ? smallTalk.questions[0]
        : ''
    return (
      <div className="faq-question-set">
        <p>User asks:</p>
        <div className="faq-questions">
          <AutosizeInput
            placeholder="Enter question"
            placeholderIsMinWidth
            value={question}
            onChange={this.handleQuestionChange.bind(this)}
          />
        </div>
        <hr />
        <p>Answers:</p>
        <div className="faq-answers">
          <ul>
            {smallTalk.answers.map((answer, index) => (
              <li key={index}>
                <SynonymComponent
                  value={answer}
                  index={index}
                  handleRemove={this.handleAnswerRemove.bind(this)}
                  handleChange={this.handleAnswerChange.bind(this)}
                />
              </li>
            ))}
          </ul>
          <AddEditorComponent
            placeholder="Add"
            className="new-entity"
            handleDone={this.handleAnswerAdd.bind(this)}
          />
        </div>
        <div className="faq-question-set__remove">
          <i
            className="fa fa-trash"
            onClick={this.handleSetRemove.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default SmallTalksQuestionSet
