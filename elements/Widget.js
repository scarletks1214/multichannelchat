import React from 'react'
import PropTypes from 'prop-types'

const Widget = ({ title, description, children, isRounded }) => {
  const widgetClass = ['widget']
  if (isRounded) {
    widgetClass.push('widget-rounded')
  }
  return (
    <div className={widgetClass.join(' ')}>
      <div className="row">
        <div className="col">
          <div className="title">{title}</div>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">{children}</div>
      </div>
    </div>
  )
}

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isRounded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ])
}

export default Widget
