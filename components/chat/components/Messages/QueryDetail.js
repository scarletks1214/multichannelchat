import React from 'react'
import { keys } from 'lodash'
class QueryDetail extends React.Component {
  iterateObject(value, key) {
    if (value instanceof Array) {
      return value.map((arrValue, i) => (
        <div className="sc-query-object" key={i}>
          <div className="sc-query-object-name">{key}</div>
          {this.iterateObject(arrValue)}
        </div>
      ))
    } else if (value instanceof Object) {
      return (
        <div className="sc-query-object">
          <div className="sc-query-object-name">{key}</div>
          {keys(value).map((objKey, i) => (
            <div className="sc-query-object" key={i}>
              {this.iterateObject(value[objKey], objKey)}
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className="sc-query-key-value">
          {key} : <b>{value}</b>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="sc-query-detail-content">
        {keys(this.props.info).map((key, i) => (
          <div className="sc-query-detail-property" key={i}>
            {this.iterateObject(this.props.info[key], key)}
          </div>
        ))}
      </div>
    )
  }
}

export default QueryDetail
