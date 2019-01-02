import React, { Component } from 'react'
import EntityListSingleComponent from './EntityListSingleComponent'
import { translate } from 'react-i18next'

class EntityListComponent extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     entities: []
  //   }
  // }

  handleEntityChange(entity, index) {
    let entities = [...this.props.entities]
    entities[index] = entity
    this.props.handleSubmit(entities)
  }

  render() {
    let { t } = this.props
    let entities = this.props.entities
    return (
      <div className="entity-list list">
        <div className="entity-row header">
          <div className="column column-name">{t('name')}</div>
          <div className="column column-value">
            <div className="column column-name">{t('values')}</div>
            <div className="column column-synonym">{t('synonyms')}</div>
          </div>
        </div>
        <div className="contents">
          {entities.map((entity, index) => (
            <EntityListSingleComponent
              entity={entity}
              key={index}
              handleEntityChange={this.handleEntityChange.bind(this)}
              onlyValueEditor
            />
          ))}
        </div>
      </div>
    )
  }
}

export default translate('translations')(EntityListComponent)
