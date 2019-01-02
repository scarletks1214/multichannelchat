import React, { Component } from 'react'
import { Table, Thead, Th, Tr, Td } from 'reactable'
import UtteranceEditor from '../../utterances/UtteranceEditor'

class UtterancesTable extends Component {
  handleUtteranceSubmit(utterance, index, isError) {
    //, items
    let utteranceUpdate = this.props.items[index]
    utteranceUpdate.value = utterance
    // utteranceUpdate.items = items;
    utteranceUpdate.isError = isError
    this.props.handleUtteranceChange(utteranceUpdate, index)
  }

  handleCheckboxChange(event) {
    let index = parseInt(event.currentTarget.dataset.index, 10)
    let utterance = this.props.items[index]
    utterance.checked = event.currentTarget.checked
    this.props.handleUtteranceChange(utterance, index)
  }

  handleUtteranceRemove(event) {
    let index = parseInt(event.currentTarget.dataset.index, 10)
    this.props.handleRemoveSingleUtterance(index)
  }
  render() {
    let { items, itemsPerPage, search } = this.props

    return (
      <div className="utterance-contents">
        <div className="col-md-12">
          <Table
            className="table table-white-top"
            itemsPerPage={itemsPerPage}
            pageButtonLimit={5}
            sortable={true}
            filterable={['name']}
            hideFilterInput
            filterBy={search}
            // noDataText="No matching records found"
          >
            <Thead>
              <Th key={0} column="checkbox" className="hidden">
                &nbsp;
              </Th>
              <Th key={1} column="name" className="hidden" />
            </Thead>
            {items.map((item, i) => (
              <Tr key={item.key}>
                <Td key={0} column="checkbox" className="checkbox">
                  <label className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      checked={item.checked}
                      onChange={this.handleCheckboxChange.bind(this)}
                      data-index={i}
                    />
                    <span className="custom-control-indicator" />
                  </label>
                </Td>
                <Td key={1} column="name" value={item.value}>
                  <div className="utterance-editor-container">
                    <UtteranceEditor
                      onSubmit={this.handleUtteranceSubmit.bind(this)}
                      isNewEditor={false}
                      initialContent={item.value}
                      index={i}
                      entities={this.props.entities}
                      handleEntitySubmit={this.props.handleEntitySubmit}
                      shouldExpand
                      workspaceEntities={this.props.workspaceEntities}
                      handleWorkspaceEntitiesSubmit={
                        this.props.handleWorkspaceEntitiesSubmit
                      }
                    />
                    <a
                      className="remove-utterance"
                      onClick={this.handleUtteranceRemove.bind(this)}
                      data-index={i}>
                      <i className="ion-icon ion-icon-2x ion-ios-trash-outline" />
                    </a>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
        </div>
      </div>
    )
  }
}

UtterancesTable.defaultProps = {
  items: [],
  columns: [],
  itemsPerPage: 20,
  text: ''
}

export default UtterancesTable
