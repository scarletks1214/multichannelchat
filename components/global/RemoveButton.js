import React from 'react'
import { IconTrash } from '../../assets/icons'

const RemoveButton = ({ className, handleClick }) => {
  return (
    <button
      className={
        'btn btn-rounded btn-icon btn-save ' + (className ? className : '')
      }
      onClick={handleClick}>
      <span>REMOVE</span>
      <IconTrash className="menu-icon double-left-arrow fill-white" />
    </button>
  )
}

export default RemoveButton
