import React, { Component } from 'react'
import { translate } from 'react-i18next'
import UtterancesTable from './UtterancesTable'
import UtteranceEditor from '../../utterances/UtteranceEditor'

class UtterancesContainer extends Component {
  constructor(props) {
    super(props)
    let itemsPerPage = localStorage.getItem('preferenceUtterancePagination')

    this.state = {
      showSearch: false,
      searchQuery: '',
      itemsPerPage: itemsPerPage ? itemsPerPage : 10
    }
  }

  // handleUtteranceSubmit(utterance, items) {
  //   let utterances = [...this.state.utterances];
  //   utterances.push({value: utterance, checked: false, items: items});
  //   this.setState({utterances: utterances});
  // }

  handleSearch(event) {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer)
      this.searchTimer = null
    }
    if (event.key === 'Escape') {
      this.setState({ searchQuery: '', showSearch: false })
    } else if (event.key === 'Enter') {
      const searchValue = event.currentTarget.value
      this.setState({ searchQuery: searchValue })
    } else {
      const searchValue = event.currentTarget.value
      this.searchTimer = setTimeout(() => {
        this.searchTimer = null
        this.setState({ searchQuery: searchValue })
      }, 300)
    }
  }
  onChangeItemsPerPage(event) {
    let itemsPerPage = parseInt(event.currentTarget.value, 10)
    this.setState({ itemsPerPage })
    localStorage.setItem('preferenceUtterancePagination', itemsPerPage)
  }
  render() {
    let {
      items,
      handleUtteranceChange,
      handleRemoveUtterances,
      handleRemoveSingleUtterance,
      t
    } = this.props
    return (
      <div className="form-group utterance-div">
        <div className="utterance-header">
          <label>
            <h4>{t('user-says')}...</h4>{' '}
            {items.length ? (
              <span className="badge badge-primary badge-sm">
                {items.length}
              </span>
            ) : (
              ''
            )}
          </label>
          <div className="buttons-container float-right color-primary">
            <div className="form-group form-inline">
              <span className="m-r-10">{t('show')}</span>
              <select
                className="custom-select m-r-10"
                onChange={this.onChangeItemsPerPage.bind(this)}
                value={this.state.itemsPerPage}>
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
                    placeholder={t('type-something')}
                    onKeyUp={this.handleSearch.bind(this)}
                  />
                  <a>
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
            <a className="remove-utterances" onClick={handleRemoveUtterances}>
              <i className="ion-icon ion-icon-2x ion-ios-trash-outline" />
            </a>
          </div>
        </div>
        <div className="form-group">
          <UtteranceEditor
            onSubmit={this.props.handleUtteranceSubmit}
            isNewEditor={true}
            entities={this.props.entities}
            handleEntitySubmit={this.props.handleEntitySubmit}
            shouldExpand={false}
            workspaceEntities={this.props.workspaceEntities}
            handleWorkspaceEntitiesSubmit={
              this.props.handleWorkspaceEntitiesSubmit
            }
          />
        </div>
        <UtterancesTable
          items={items}
          handleUtteranceChange={handleUtteranceChange}
          handleRemoveSingleUtterance={handleRemoveSingleUtterance}
          search={this.state.searchQuery}
          itemsPerPage={this.state.itemsPerPage}
          entities={this.props.entities}
          handleEntitySubmit={this.props.handleEntitySubmit}
          workspaceEntities={this.props.workspaceEntities}
          handleWorkspaceEntitiesSubmit={
            this.props.handleWorkspaceEntitiesSubmit
          }
        />
      </div>
    )
  }
}

UtterancesContainer.defaultProps = {
  items: [],
  columns: [],
  itemsPerPage: 20,
  text: ''
}

export default translate('translations')(UtterancesContainer)
