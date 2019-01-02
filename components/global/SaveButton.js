import React from 'react'
import { IconSave } from '../../assets/icons'

const SaveButton = ({ className, handleSave, disabled }) => {
  return (
    <button
      className={
        'btn btn-rounded btn-icon btn-save ' + (className ? className : '')
      }
      onClick={handleSave} disabled={disabled}>
      <span>SAVE</span>
      <IconSave className="menu-icon double-left-arrow fill-white" />
    </button>
  )
}

export default SaveButton
