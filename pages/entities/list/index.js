import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Pagination from 'react-js-pagination'

import { loadEntities, saveEntities } from '../../../actions/entity'
import Jumbotron from '../../../elements/jumbotron'
import EntityListSingleComponent from '../../../components/entities/EntityListSingleComponent'
import AddEditorComponent from '../../../components/global/AddEditorComponent'
import SaveButton from '../../../components/global/SaveButton'
import { workspaceEntitiesToJSON } from '../../../utils/Converters'
import { Loader } from '../../../components/global/loader'

class EntityListPage extends Component {
  constructor(props) {
    super(props)
    this.navInfo = [{ url: '/banking', title: 'Banking' }]
    const { entity } = this.props
    const entities = entity.entities
      ? this.loadAndParseWorkspace(entity.entities)
      : []

    this.state = {
      entities,
      showSearch: false,
      searchQuery: '',
      activePage: 1,
      itemsCountPerPage: localStorage.getItem('entity-itemCountPerPage') || 5,
      filteredCount: entities.length
    }
  }

  loadAndParseWorkspace(rawEntities) {
    const entities = []
    for (let key in rawEntities) {
      let entity = { name: key, values: [] }
      let rawEntity = rawEntities[key]
      for (let valueKey in rawEntity.values) {
        entity.values.push({
          name: valueKey,
          synonyms: rawEntity.values[valueKey]
        })
      }
      entities.push(entity)
    }
    return entities
    // this.setState({ entities })
  }

  async componentDidMount() {
    const { loadEntities, workspace, entity } = this.props
    if (entity.entities) return
    const res = await loadEntities(workspace.id)
    const entities = this.loadAndParseWorkspace(res.response.entities)
    this.setState({ entities, filteredCount: entities.length })
  }

  handleNewEntity(entityName) {
    let entities = this.state.entities
    entities.push({ name: entityName, values: [] })
    this.setState({ entities })
    this.updatePageSetting()
  }

  handleEntityChange(entity, index) {
    let entities = this.state.entities
    entities[index] = entity
    this.setState({ entities })
  }

  handleEntityRemove(index) {
    let entities = this.state.entities
    entities.splice(index, 1)
    this.setState({ entities })
    this.updatePageSetting()
  }

  handleSave() {
    const { saveEntities, workspace } = this.props
    const entitiesJSON = workspaceEntitiesToJSON(this.state.entities)
    saveEntities(workspace.id, entitiesJSON)
  }

  handleSearch(event) {
    // if (this.searchTimer) {
    //   clearTimeout(this.searchTimer)
    //   this.searchTimer = null
    // }
    if (event.key === 'Escape') {
      this.setState({ searchQuery: '', showSearch: false })
    } else {
      const searchValue = event.currentTarget.value
      // this.searchTimer = setTimeout(() => {
      // this.searchTimer = null
      this.setState({ searchQuery: searchValue })
      // }, 300)
    }
    this.updatePageSetting()
  }

  handlePageChange(activePage) {
    this.setState({ activePage })
  }

  handlePageLimitChange(event) {
    const itemsCountPerPage = event.target.value
    this.setState({ itemsCountPerPage })
    localStorage.setItem('entity-itemCountPerPage', itemsCountPerPage)
  }

  updatePageSetting() {
    const { entities, showSearch, searchQuery } = this.state
    const filteredEntities = entities.filter(
      entity =>
        !showSearch ||
        entity.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    this.setState({ filteredCount: filteredEntities.length, activePage: 1 })
  }

  renderHeader() {
    let { t } = this.props
    return (
      <div className="header">
        <div className="title">
          <h3>{t('entities').toUpperCase()}</h3>
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

  renderToolbar() {
    return (
      <div className="d-flex justify-content-end color-primary">
        <div className="form-group form-inline">
          <span className="m-r-10">Show</span>
          <select
            className="custom-select m-r-10"
            value={this.state.itemsCountPerPage}
            onChange={this.handlePageLimitChange.bind(this)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        {this.state.showSearch ? (
          <div>
            <div className="input-group search-button-container">
              <span className="input-group-addon rounded-left">
                <i className="fa fa-search" />
              </span>
              <input
                type="text"
                className="form-control rounded-right"
                placeholder="Type something..."
                onKeyUp={this.handleSearch.bind(this)}
              />
              <a className="ml-2">
                <i
                  className="ion-icon ion-icon-2x ion-close"
                  onClick={() =>
                    this.setState({ showSearch: false, searchQuery: '' })
                  }
                />
              </a>
            </div>
          </div>
        ) : (
          <a>
            <i
              className="ion-icon ion-icon-2x ion-ios-search-strong"
              onClick={() => this.setState({ showSearch: true })}
            />
          </a>
        )}
      </div>
    )
  }

  showFilteredResult() {
    const {
      entities,
      showSearch,
      searchQuery,
      activePage,
      itemsCountPerPage
    } = this.state

    const filteredEntities = entities.filter(
      entity =>
        !showSearch ||
        entity.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const start = (activePage - 1) * itemsCountPerPage
    const end = activePage * itemsCountPerPage

    return filteredEntities
      .slice(start, end)
      .map((entity, index) => (
        <EntityListSingleComponent
          entity={entity}
          key={index}
          index={index}
          handleEntityChange={this.handleEntityChange.bind(this)}
          handleRemove={this.handleEntityRemove.bind(this)}
        />
      ))
  }

  render() {
    const { activePage, itemsCountPerPage, filteredCount } = this.state
    const { entity } = this.props
    return (
      <div className="page entity-list-page">
        <Jumbotron navInfo={this.navInfo} />
        <div className="page-content">
          {this.renderHeader()}
          {this.renderToolbar()}
          <div className="entity-list-wrapper">
            <AddEditorComponent
              placeholder="Add New Entity"
              className="new-entity"
              handleDone={this.handleNewEntity.bind(this)}
            />
            <div className="entity-list list mt-4">
              <div className="entity-row header">
                <div className="column column-name">Name</div>
                <div className="column column-value">
                  <div className="column column-name">Values</div>
                  <div className="column column-synonym">Synonyms</div>
                </div>
              </div>
              <div className="contents">
                {this.showFilteredResult()}
                <div className="d-flex justify-content-center">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={filteredCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                    innerClass="pagination pagination-primary"
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </div>
            </div>
          </div>
          <Loader loading={entity.isLoading} text="Loading..." fullPage />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    entity: state.entity,
    workspace: state.workspace.workspace
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadEntities, saveEntities }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  translate('translations')(EntityListPage)
)
