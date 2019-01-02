import React from 'react'

const IconSearch = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 22 22"
    className={'svg-icon ' + (className ? className : '')}>
    <defs>
      <path id="a" d="M0 0h21.431v21.328H.001z" />
    </defs>
    <g fillRule="evenodd">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <path
        fill="#2070B7"
        d="M1.455 8.212c0-3.723 3.032-6.756 6.756-6.756 3.726 0 6.758 3.033 6.758 6.756a6.764 6.764 0 0 1-6.758 6.756 6.763 6.763 0 0 1-6.756-6.756zM21.431 19.77l-6.647-6.646a8.17 8.17 0 0 0 1.64-4.91 8.213 8.213 0 1 0-8.213 8.213c1.87 0 3.59-.632 4.97-1.686l6.587 6.588 1.663-1.559z"
        mask="url(#b)"
      />
    </g>
  </svg>
)
export default IconSearch
