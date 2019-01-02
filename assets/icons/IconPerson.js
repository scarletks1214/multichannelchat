import React from 'react'

const IconPerson = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 33 33"
    className={'svg-icon ' + (className ? className : '')}>
    <defs>
      <path id="a" d="M0 .67h32.329V33H0z" />
    </defs>
    <g fillRule="evenodd">
      <g transform="translate(0 -.67)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill="#2070B7"
          d="M32.329 16.835C32.329 25.763 25.093 33 16.165 33S0 25.763 0 16.835C0 7.908 7.237.67 16.165.67c8.928 0 16.164 7.238 16.164 16.165"
          mask="url(#b)"
        />
      </g>
      <path
        fill="#FFF"
        d="M16.089 13.145c1.98 0 3.697-1.722 3.697-3.703 0-1.981-1.716-3.698-3.697-3.698-1.98 0-3.696 1.717-3.696 3.698 0 1.981 1.716 3.703 3.696 3.703M16.089 14.38c-3.24 0-6.165 3.492-6.165 7.84 0 4.34 12.33 4.34 12.33 0 0-4.348-2.925-7.84-6.165-7.84"
      />
    </g>
  </svg>
)
export default IconPerson
