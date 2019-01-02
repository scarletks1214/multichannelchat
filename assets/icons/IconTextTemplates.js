import React from 'react'

const IconTextTemplates = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 24"
    className={'svg-icon ' + (className ? className : '')}>
    <defs>
      <rect id="a" width="19.5" height="24" rx="1.5" fill="white" />
      <path
        id="b"
        d="M12.9 22.5H9.75v-3.15zM19.2 16.2l-5.25 5.249-3.15-3.15 5.25-5.25z"
        fill="black"
      />
      <path
        id="c"
        d="M3.75 5.25h12M3.75 9.75h12M3.75 14.25h6"
        strokeLinecap="square"
        strokeWidth="1.5"
        stroke="black"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="d" fill="#fff">
        <use xlinkHref="#a" />
        <use xlinkHref="#b" />
        <use xlinkHref="#c" />
      </mask>
      <g transform="translate(.75 -.031)" mask="url(#d)">
        <rect width="19.5" height="24" rx="1.5" />
      </g>
    </g>
  </svg>
)
export default IconTextTemplates
