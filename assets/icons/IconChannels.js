import React from 'react'

const IconChannels = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 27 25"
    className={'svg-icon ' + (className ? className : '')}>
    <g fillRule="evenodd">
      <g transform="translate(-.675 -.531)">
        <circle cx="14.175" cy="15.863" r="3.375" />
        <circle cx="14.175" cy="3.375" r="2.531" />
        <path
          // strokeLinecap="square"
          // strokeWidth="1.08"
          // d="M14.175 12.825V5.941"
          d="M13.475 12.825V5.941H14.875V12.82 Z"
        />
        <circle
          cx="24.3"
          cy="22.661"
          r="2.531"
          transform="rotate(152 24.3 22.66)"
        />
        <path
          // strokeLinecap="square"
          // strokeWidth="1.08"
          // d="M22.038 21.061L16.2 17.414"
          d="M22.038 21.061L16.2 17.414L17.2 16.414L23.038 20.061 Z"
        />
        <circle
          cx="4.05"
          cy="22.661"
          r="2.531"
          transform="scale(-1 1) rotate(-28 0 38.904)"
        />
        <path
          // strokeLinecap="square"
          // strokeWidth="1.08"
          d="M11.644 17.414L5.806 21.06L4.806 20.06L12.644 16.4145 Z"
        />
      </g>
    </g>
  </svg>
)
export default IconChannels
