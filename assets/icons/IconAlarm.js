import React from 'react'

const IconAlarm = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 20"
    className={'svg-icon ' + (className ? className : '')}>
    <path
      fillRule="evenodd"
      d="M14.796 13.84V8.563c0-2.978-2.016-5.378-4.8-6.047V1.84c0-.768-.671-1.44-1.44-1.44-.768 0-1.438.672-1.438 1.44v.676c-2.785.669-4.8 3.069-4.8 6.047v5.277L.396 15.762v.962h16.322v-.962l-1.922-1.922zm-6.24 5.76a1.924 1.924 0 0 0 1.918-1.921h-3.84c0 1.059.868 1.922 1.923 1.922z"
    />
  </svg>
)
export default IconAlarm
