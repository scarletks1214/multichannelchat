import React from 'react'
import { Table, Thead, Th, Tr, Td } from 'reactable'

class RecentQuery extends React.Component {
  render() {
    const { columns, columnNames, items } = this.props
    return (
      <Table
        className="table"
        itemsPerPage={5}
        pageButtonLimit={3}
        hideFilterInput>
        <Thead>
          {columns.map((column, i) => (
            <Th key={i} column={column}>
              {columnNames[column]}
            </Th>
          ))}
        </Thead>
        {items.map((item, i) => (
          <Tr key={i}>
            {columns.map((column, j) => (
              <Td key={j} column={column} data={item[column]}>
                <span>{item[column]}</span>
              </Td>
            ))}
          </Tr>
        ))}
      </Table>
    )
  }
}

export default RecentQuery
