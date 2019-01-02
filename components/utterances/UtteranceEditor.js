import React, { Component } from 'react'
import { addNotification as notify } from 'reapop'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import UtteranceEntitiesPopup from './UtteranceEntitiesPopup'
import enhanceWithClickOutside from 'react-click-outside'
import {
  validateWithRegEx,
  ENTITY_VALIDATION_REGEX,
  UTTERANCE_VALIDATION_REGEX
} from '../../utils/Validations'
import EntityListComponent from '../entities/EntityListComponent'

class UtterancesEditor extends Component {
  constructor() {
    super()
    this.items = []
    this.isError = false
    this.state = {
      originalUtterance: '',
      popupX: 0,
      popupY: 0,
      editorFocus: false,
      focusInEditor: false,
      utteranceEntities: []
    }
  }
  componentDidMount() {
    if (!this.props.isNewEditor) {
      this.contentForUtterance(this.props.initialContent)
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !this.props.isNewEditor &&
      prevProps.initialContent !== this.props.initialContent
    ) {
      this.contentForUtterance(this.props.initialContent)
    }
  }
  onEditorKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.handleOnEnter(event)
    }
  }

  handleOnEnter(event) {
    let isError = this.items.some(item => item.isError === true)
    if (!isError && this.refs.utteranceInputEditor.textContent !== '') {
      if (this.props.isNewEditor) {
        this.props.onSubmit(this.refs.utteranceInputEditor.textContent) //, this.items);
        this.refs.utteranceInputEditor.innerHTML = ''
        this.setState({ showPopup: false, currentPopupItemKey: -1 })
      } else {
        this.props.onSubmit(
          this.refs.utteranceInputEditor.textContent,
          this.props.index,
          isError
        ) //, this.items
      }
    }
  }
  onEditorFocus(event) {
    this.setState({ editorFocus: true, focusInEditor: true })
  }
  onEditorBlur(event) {
    if (!this.props.isNewEditor) {
      // If editing, we are gonna save it when it's blurred
      let isError = this.items.some(item => item.isError === true)
      this.props.onSubmit(
        this.refs.utteranceInputEditor.textContent,
        this.props.index,
        isError
      ) //, this.items
    }
    this.setState({ focusInEditor: false })
  }

  handleClickOutside() {
    this.setState({
      editorFocus: false
    })
  }
  handleClickOutsidePopup() {
    if (this.state.showPopup === true && !this.state.focusInEditor) {
      this.setState({ showPopup: false, currentPopupItemKey: -1 })
    }
  }
  onEditorChange(event) {
    let offset = this.getCaretCharacterOffsetWithin(event.currentTarget)
    let items = this.parseOriginalUtterance(event.currentTarget.textContent)
    const { notify } = this.props
    this.items = [...items]
    let contents = this.editorInnerContent(items)
    this.refs.utteranceInputEditor.innerHTML = contents.join('')
    let isError = this.items.some(
      item => item.isError === true && item.isLast === false
    )
    if (!this.isError && isError) {
      // Then we will show error
      notify({
        title: 'Invalid Utterance',
        message: `${event.currentTarget.textContent}`,
        status: 'error',
        position: 'tr',
        dismissible: true
      })
    }
    this.isError = isError
    this.setCaretPosition(event.currentTarget, offset)
  }

  onSelectionChange(event) {
    let element = event.currentTarget
    var doc = element.ownerDocument || element.document
    var win = doc.defaultView || doc.parentWindow
    var sel
    if (typeof win.getSelection !== 'undefined') {
      sel = win.getSelection()
      if (sel.rangeCount > 0) {
        let decoratorNode = window
          .$(sel.anchorNode.parentElement)
          .closest('.decorator')

        if (decoratorNode.hasClass('part-entity')) {
          let currentPopupItemKey = decoratorNode.attr('key')
          let position = decoratorNode.position()
          // if (this.state.showPopup === false || this.state.currentPopupItemKey != currentPopupItemKey) {
          // }
          this.setState({
            showPopup: true,
            currentPopupItemKey,
            popupX: position.left + 10,
            popupY: position.top + 40,
            showPopupEntityValue: decoratorNode.text().replace(/[{}]*/g, '')
          })
        } else {
          if (this.state.showPopup === true) {
            this.setState({ showPopup: false, currentPopupItemKey: -1 })
          }
        }
      }
    }
  }

  contentForUtterance(utterance) {
    let items = this.parseOriginalUtterance(utterance)
    this.items = [...items]
    let contents = this.editorInnerContent(items)
    let isError = this.items.some(item => item.isError === true)
    this.isError = isError
    this.refs.utteranceInputEditor.innerHTML = contents.join('')
  }

  assessCurrentPart(part, index, count) {
    let item = {
      text: part,
      key: index,
      isError: false,
      type: 'text',
      isLast: false
    }
    if (part.startsWith('{') || part.endsWith('}')) {
      item.type = 'entity'
      item.class = 'part-entity'
      if (!part.startsWith('{') || !part.endsWith('}')) {
        item.isError = true
      } else if (!validateWithRegEx(part, ENTITY_VALIDATION_REGEX)) {
        item.isError = true
      }
      item.isLast = index + 1 === count
      if (index + 1 === count && part.startsWith('{') && !part.endsWith('}')) {
        item.class += ' partial'
      } else if (item.isError) {
        item.class += ' error'
      } else {
        let entity = part.replace(/[{}]*/g, '')
        let entityFound = this.props.entities.find(ent => entity === ent.name)
        if (entityFound) {
          item.class += ' complete'
        } else {
          item.isError = true
          item.class += ' warning'
        }
      }
    } else {
      item.class = 'part-text'
      if (!validateWithRegEx(part, UTTERANCE_VALIDATION_REGEX)) {
        item.isError = true
        item.class += ' error'
      }
    }
    return item
  }

  getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0
    var doc = element.ownerDocument || element.document
    var win = doc.defaultView || doc.parentWindow
    var sel
    if (typeof win.getSelection !== 'undefined') {
      sel = win.getSelection()
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0)
        var preCaretRange = range.cloneRange()
        preCaretRange.selectNodeContents(element)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        caretOffset = preCaretRange.toString().length
      }
    } else if ((sel = doc.selection) && sel.type !== 'Control') {
      var textRange = sel.createRange()
      var preCaretTextRange = doc.body.createTextRange()
      preCaretTextRange.moveToElementText(element)
      preCaretTextRange.setEndPoint('EndToEnd', textRange)
      caretOffset = preCaretTextRange.text.length
    }
    return caretOffset
  }

  setCaretPosition(element, offset) {
    var range = document.createRange()
    var sel = window.getSelection()

    //select appropriate node
    var currentNode = null
    var previousNode = null

    for (var i = 0; i < element.childNodes.length; i++) {
      //save previous node
      previousNode = currentNode

      //get current node
      currentNode = element.childNodes[i]
      //if we get span or something else then we should get child node
      while (currentNode.childNodes.length > 0) {
        currentNode = currentNode.childNodes[0]
      }

      //calc offset in current node
      if (previousNode != null) {
        offset -= previousNode.length
      }
      //check whether current node has enough length
      if (offset <= currentNode.length) {
        break
      }
    }
    //move caret to specified offset
    if (currentNode != null) {
      range.setStart(currentNode, offset)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  parseOriginalUtterance(utterance) {
    let parts = []
    let utteranceEntities = []

    let currentPart = ''
    for (let i = 0; i < utterance.length; i++) {
      let currentChar = utterance.charAt(i)
      if (currentChar === '{') {
        if (currentPart !== '') {
          parts.push(currentPart)
        }
        currentPart = '{'
      } else if (currentChar === '}') {
        currentPart += currentChar
        parts.push(currentPart)
        currentPart = ''
      } else {
        currentPart += currentChar
      }
    }
    if (currentPart !== '') {
      parts.push(currentPart)
    }
    let entityNames = []
    let items = parts.map((part, index) => {
      let item = this.assessCurrentPart(part, index, parts.length)
      if (item.type === 'entity' && !item.isError) {
        entityNames.push(part.replace(/[{}]*/g, ''))
      }
      return item
    })

    utteranceEntities = this.props.workspaceEntities.filter(ent =>
      entityNames.includes(ent.name)
    )
    this.setState({ utteranceEntities })
    if (items.length === 0) {
      // items.push(this.assessCurrentPart('', 0))
    }
    return items
  }
  editorInnerContent(items) {
    return items.map(
      item =>
        `<span class="decorator ${item.class}" key=${
          item.key
        }><span data-offset-key="36ap2-2-0"><span data-text="true">${
          item.text
        }</span></span></span>`
    )
  }
  handleEntitySubmit(entity, isNew) {
    let items = this.items
    let itemEdited = this.items[this.state.currentPopupItemKey]
    itemEdited.text = `{${entity}}`
    itemEdited.isError = false
    itemEdited.class = 'part-entity complete'
    this.isError = this.items.some(item => item.isError === true)
    let contents = this.editorInnerContent(items)
    this.refs.utteranceInputEditor.innerHTML = contents.join('')
    let offset = 0
    for (let i = 0; i <= this.state.currentPopupItemKey; i++) {
      offset += this.items[i].text.length
    }
    setTimeout(() => {
      this.setCaretPosition(this.refs.utteranceInputEditor, offset)
    }, 20)
    setTimeout(() => {
      this.setState({ showPopup: false, currentPopupItemKey: -1 })
    }, 50)
    this.props.handleEntitySubmit(entity, isNew)
  }

  render() {
    const { t } = this.props
    return (
      <div
        className={
          'utterance-input-container ' +
          (this.props.className ? this.props.className : '')
        }>
        <div className="utterance-input-editor-wrapper">
          <div
            className="utterance-input-editor"
            contentEditable="true"
            role="textbox"
            spellCheck="false"
            onKeyUp={this.onEditorChange.bind(this)}
            ref="utteranceInputEditor"
            onKeyDown={this.onEditorKeyDown.bind(this)}
            onSelect={this.onSelectionChange.bind(this)}
            onBlur={this.onEditorBlur.bind(this)}
            onFocus={this.onEditorFocus.bind(this)}
            placeholder={this.props.placeholder || t('add-user-says')}
          />
          {this.props.isNewEditor && (
            <i
              className="ion-icon ion-icon-2x ion-ios-plus-empty add-new-utterance"
              onClick={this.handleOnEnter.bind(this)}
            />
          )}
          {this.props.shouldExpand &&
            this.state.editorFocus &&
            this.state.utteranceEntities &&
            this.state.utteranceEntities.length > 0 && (
              <EntityListComponent
                entities={this.state.utteranceEntities}
                handleSubmit={this.props.handleWorkspaceEntitiesSubmit}
              />
            )}
          {this.state.showPopup && (
            <UtteranceEntitiesPopup
              entities={this.props.entities}
              isVisible={this.state.showPopup}
              top={this.state.popupY}
              left={this.state.popupX}
              entityValue={this.state.showPopupEntityValue}
              handleEntitySubmit={this.handleEntitySubmit.bind(this)}
              handleClickOutside={this.handleClickOutsidePopup.bind(this)}
            />
          )}
        </div>
      </div>
    )
  }
}

UtterancesEditor.defaultProps = {
  text: ''
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      notify
    },
    dispatch
  )
export default connect(null, mapDispatchToProps)(
  enhanceWithClickOutside(translate('translations')(UtterancesEditor))
)
