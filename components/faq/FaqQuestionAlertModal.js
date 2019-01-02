import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const FaqQuestionAlertModal = ({ toggleProductAlert }) => {
  return (
    <Modal
      isOpen={true}
      toggle={toggleProductAlert}
      wrapClassName="modal-danger"
      size="default">
      <ModalHeader>
        <i className="fa fa-warning mr-2" />Warning
      </ModalHeader>
      <ModalBody>
        Every question set must have at least one product.
      </ModalBody>
    </Modal>
  )
}

export default FaqQuestionAlertModal
