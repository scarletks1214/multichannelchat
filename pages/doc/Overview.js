import React from 'react'
import { connect } from 'react-redux'
import { addNotification as notify } from 'reapop'

import DocImage1 from '../../assets/images/how-are-you.png'
import DocImage2 from '../../assets/images/ml.png'
import ChannelsImage from '../../assets/images/channels.png'
import FintechImage from '../../assets/images/fintech.png'
import AiImage from '../../assets/images/everywhere.png'

class OverviewPage extends React.Component {
  constructor(props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    const { notify } = this.props
    console.log(this.props)
    notify({
      title: 'Comming Soon',
      message: 'Thanks for your interest',
      status: 'info',
      position: 'tc',
      dismissible: true
    })
  }

  render() {
    return (
      <div className="container doc-page">
        <div className="row align-items-center block">
          <div className="col-md-7">
            <h1 className="mb-5">Create flawless natural conversations</h1>
            <p>
              Triniti’s flexible AI platform incorporates an extensive suite of
              tools that allow you to build next-generation smart applications
              where your data lives: whether on-premise or in the intelligent
              cloud. Give your customers innovative ways to interact flawlessly
              with your product by building advanced voice and text-based
              conversational interfaces powered by the Triniti AI.
            </p>
            <button className="btn btn-primary" onClick={() => this._onClick()}>
              Sign up Free
            </button>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <img className="img-fluid" src={DocImage1} alt="Landing 1" />
          </div>
        </div>
        <div className="row block">
          <div className="col-md-5 d-flex align-items-center">
            <img className="img-fluid" src={DocImage2} alt="Landing 2" />
          </div>
          <div className="col-md-7">
            <h1 className="mb-4">
              Gain in-depth understanding of user conversations with machine
              learning
            </h1>
            <p>
              In natural conversation colloquiums, abbreviations, acronyms and
              the like are more common than is perfect grammar and syntax.
              Provide examples of what customers may say during typical
              interactions with your product and let Triniti’s intelligent AI
              algorithms learn the true meaning.<br />
              Triniti is smart enough to:
            </p>
            <ul>
              <li>recognise and comprehend intent,</li>
              <li>interpret discourse and reactions, </li>
              <li>extract entities and identify pragmatics, </li>
              <li>analyse feelings and emotions, </li>
              <li>a whole lot more. </li>
            </ul>
          </div>
        </div>
        <div className="row block">
          <div className="col-12">
            <h1 className="mb-4 text-center">
              Expand your reach across the globe / around the world
            </h1>
          </div>
          <div className="col-md-4 mb-3 d-flex align-items-center">
            <img
              className="img-fluid img-small"
              src={ChannelsImage}
              alt="World"
            />
          </div>
          <div className="col-md-4 mb-3 d-flex align-items-center">
            <img
              className="img-fluid img-small"
              src={FintechImage}
              alt="World"
            />
          </div>
          <div className="col-md-4 mb-3 d-flex align-items-center">
            <img className="img-fluid img-small" src={AiImage} alt="World" />
          </div>
          <div className="col-md-4 mb-3">
            <h2>Reach new audiences </h2>
          </div>
          <div className="col-md-4 mb-3">
            <h2>Tailored for FinTech development</h2>
          </div>
          <div className="col-md-3 mb-3">
            <h2>Take AI to your customers globally</h2>
          </div>
          <div className="col-md-4">
            <p>
              Multilingual support allows you to expand into new markets
              anywhere in the world. Supports Thai, Malay, and many Asian
              languages.
            </p>
          </div>
          <div className="col-md-4">
            <p>
              Get ahead of the pack with pre-trained FinTech models included in
              the enterprise-grade Triniti AI Engine.
            </p>
          </div>
          <div className="col-md-4">
            <p>
              Build next-generation applications where your data resides. The
              Triniti AI engine is platform agnostic and functions seamlessly
              on-premise or in the intelligent cloud.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(null, { notify })(OverviewPage)
