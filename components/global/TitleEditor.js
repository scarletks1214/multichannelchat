import React, { Component } from 'react'
import {
  validateWithRegEx,
  NAME_VALIDATION_REGEX
} from '../../utils/Validations'
import { addNotification as notify } from 'reapop'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutosizeInput from './AutosizeInput'

class TitleEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editName: true
    }
  }

  handleDone() {
    if (
      !this.props.shouldValidate ||
      validateWithRegEx(this.props.name, NAME_VALIDATION_REGEX)
    ) {
      this.setState({ editName: false })
    } else {
      let { notify } = this.props
      notify({
        title: `Invalid Name`,
        message: `Name should start with alphabet and contain only alpha numeric and '_', '-', '.', '#'`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
  }

  onEditorKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.handleDone()
    }
  }

  render() {
    return (
      // <div className="title-editor">
      //   {this.state.editName ?
      //   (<div><input type="text" name="name" className="title-editor-input input-no-focus-outline" placeholder={this.props.placeholder} value={this.props.name} onChange={this.props.handleChange}
      //   onKeyDown={this.onTitleEditorKeyDown.bind(this)}/>
      //   <i className="fa fa-check ml-2" onClick={this.handleDone.bind(this)}/></div>)
      //   :
      //   (<div><h4>{this.props.name === '' ? this.props.placeholder : this.props.name}</h4><i className="fa fa-pencil ml-2" onClick={() => this.setState({editName: true})}></i></div>)}
      // </div>
      <div className="title-editor">
        {/* {this.state.editName ?
          (<div> */}
        <AutosizeInput
          placeholder={this.props.placeholder}
          placeholderIsMinWidth
          value={this.props.name}
          onChange={this.props.handleChange}
          onKeyDown={this.onEditorKeyDown.bind(this)}
          readOnly={!this.state.editName}
        />
        {/* {this.state.editName ? (
          <i
            className="fa fa-check ml-2"
            onClick={this.handleDone.bind(this)}
          />
        ) : (
          <i
            className="fa fa-pencil ml-2"
            onClick={() => this.setState({ editName: true })}
          />
        )}
 */}
        {/* <input type="text" name="name" className="title-editor-input input-no-focus-outline" placeholder={this.props.placeholder} value={this.props.name} onChange={this.props.handleChange}
          onKeyDown={this.onTitleEditorKeyDown.bind(this)}/> */}
        {/* <i className="fa fa-check ml-2" onClick={this.handleDone.bind(this)}/></div>)
          :
          (<div><h4>{this.props.name === '' ? this.props.placeholder : this.props.name}</h4><i className="fa fa-pencil ml-2" onClick={() => this.setState({editName: true})}></i></div>)} */}
      </div>
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify
    },
    dispatch
  )
export default connect(null, mapDispatchToProps)(TitleEditor)
