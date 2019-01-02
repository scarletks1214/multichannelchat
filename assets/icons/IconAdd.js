import React from 'react'

const IconAdd = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 21"
    className={'svg-icon ' + (className ? className : '')}>
    <path
      fillRule="evenodd"
      d="M11.352 9.648V.852a.853.853 0 0 0-1.704 0v8.796H.852a.851.851 0 1 0 0 1.704h8.796v8.796a.851.851 0 1 0 1.704 0v-8.796h8.796a.853.853 0 0 0 0-1.704h-8.796z"
    />
  </svg>
)
export default IconAdd
