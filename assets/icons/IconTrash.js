import React from 'react'

const IconTrash = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 18 22"
    className={'svg-icon ' + (className ? className : '')}>
    <defs>
      <path id="a" d="M0 .152H17.27V22H0z" />
      <path id="c" d="M0 22.848h17.269V1H0z" />
    </defs>

    <g fillRule="evenodd" transform="translate(0 -1)">
      <g transform="translate(0 .848)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          d="M15.902 5.297H1.367V4.214c0-.086.035-.136.123-.136h14.29c.085 0 .122.05.122.136v1.083zm-1.279 15.226c0 .086-.037.123-.123.123H2.77c-.087 0-.124-.037-.124-.123V6.651h11.977v13.872zm-8.85-17.8h5.723V1.505H5.772v1.218zm10.006.001h-2.917V.829a.678.678 0 0 0-.689-.677.108.108 0 0 0-.074.024.1.1 0 0 0-.05-.024H5.094a.667.667 0 0 0-.676.677v1.895H1.49c-.838 0-1.49.653-1.49 1.49v2.437h1.293v13.872A1.45 1.45 0 0 0 2.77 22H14.5c.837 0 1.488-.64 1.488-1.477V6.651h1.281V4.214c0-.837-.652-1.49-1.49-1.49z"
          mask="url(#b)"
        />
      </g>
      <mask id="d" fill="#fff">
        <use xlinkHref="#c" />
      </mask>
      <path
        d="M11.116 20.287h1.365v-11.2h-1.365zM7.964 20.287H9.33v-11.2H7.964zM4.814 20.287h1.365v-11.2H4.814z"
        mask="url(#d)"
      />
    </g>
  </svg>
)

export default IconTrash
