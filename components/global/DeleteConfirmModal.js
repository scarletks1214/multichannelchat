import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const DeleteConfirmModal = ({ showModal, onCancel, onDelete, info }) => {
  return (
    <Modal
      isOpen={showModal}
      toggle={onCancel}
      wrapClassName={'modal-danger'}
      size={'sm'}>
      <ModalHeader toggle={onCancel}>Delete?</ModalHeader>
      <ModalBody>Are you sure you want to delete {info || ''}?</ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
        <button className="btn btn-default btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteConfirmModal
