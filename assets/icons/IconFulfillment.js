import React from 'react'

const IconFulfillment = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 24"
    className={'svg-icon ' + (className ? className : '')}>
    <defs>
      <rect id="a" width="19.5" height="24" fill="white" rx="1.5" />
      <path
        id="b"
        strokeLinecap="square"
        strokeWidth="1.5"
        d="M3.75 5.25h12M3.75 9.75h12M3.75 14.25h12"
        stroke="black"
      />
      <path
        id="c"
        strokeWidth="1.5"
        d="M11.25 19.071L13.275 21 18 16.5"
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
        <rect width="19.5" height="24" fill="#FFF" rx="1.5" />
      </g>
    </g>
  </svg>
)
export default IconFulfillment
