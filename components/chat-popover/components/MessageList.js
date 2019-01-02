import React, { Component } from 'react'
import { translate } from 'react-i18next'
import Message from './Messages'
import { API_VERSION_1_1 } from '../../../config/constants'

class MessageList extends Component {
  parseResponse(response, apiVersion = API_VERSION_1_1) {
    const { t } = this.props
    let sections = []
    sections.push([
      {
        title: t('user-says'),
        content:
          apiVersion === API_VERSION_1_1
            ? response.preprocessor[0].input
            : response['query-processor'].input,
        className: 'blue-text-content'
      }
    ])
    let queries =
      apiVersion === API_VERSION_1_1 ? response.queries : response.output
    queries.forEach(query => {
      let messages = []
      messages.push({ title: t('query'), content: query.query })
      messages.push({
        title: t('response'),
        content: this.parseContent('response', query.response, apiVersion),
        className: 'blue-text-content'
      })
      if (apiVersion === API_VERSION_1_1) {
        messages.push({
          title: t('intent'),
          content: this.parseContent('intent', query.intent, apiVersion)
        })
      } else {
        messages.push({
          title: t('intent'),
          content: this.parseContent(
            'top-intent',
            query['top-intent'],
            apiVersion
          )
        })
      }
      messages.push({
        title: t('entities'),
        content: this.parseContent('entities', query.entities, apiVersion)
      })
      messages.push({
        title: t('similar-questions'),
        content: this.parseContent('similar', query.similar, apiVersion)
      })
      sections.push(messages)
    })
    return sections
  }
  parseContent(type, data, apiVersion) {
    if (!data) {
      return null
    }
    let content = []
    if (apiVersion === API_VERSION_1_1) {
      if (type === 'intent') {
        let confidence = -10
        data.forEach(intent => {
          if (parseFloat(intent.confidence) > confidence) {
            content = [intent.class]
            confidence = parseFloat(intent.confidence)
          }
        })
      } else if (type === 'entities') {
        content = data.map(
          entity => `${entity.entityType}=${entity.entityValue}`
        )
      } else if (type === 'response') {
        content = data.map(response => response.message)
      } else if (type === 'similar') {
        content = data.map(similar => similar.query)
      }
    } else {
      if (type === 'entities') {
        content = data.map(entity => `${entity.name}=${entity.value}`)
      } else if (type === 'response') {
        content = data.map(response => response.message)
      } else if (type === 'top-intent') {
        content = [data.name]
      } else if (type === 'similar') {
        content = data.map(similar => similar.query)
      }
    }

    content = content.filter(item => item)
    return content.length > 0 ? content : null
  }
  renderQuery(section, i) {
    return (
      <div className="section" key={i}>
        {section.map((message, index) => (
          <Message
            title={message.title}
            content={message.content}
            key={index}
            className={message.className}
          />
        ))}
      </div>
    )
  }

  render() {
    const { t } = this.props
    let noResonse = !this.props.response
    let sections = !noResonse
      ? this.parseResponse(this.props.response, API_VERSION_1_1)
      : []
    return (
      <div
        className={'sc-message-list' + (noResonse ? ' no-response' : '')}
        ref={el => (this.scrollList = el)}>
        {noResonse ? (
          <span className="placeholder-message">
            {t('test-your-bot-message')}
          </span>
        ) : (
          <div>
            <span className="message-header">{t('results')}</span>
            <div className="message-contents">
              {sections.map((section, i) => {
                return this.renderQuery(section, i)
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default translate('translations')(MessageList)
