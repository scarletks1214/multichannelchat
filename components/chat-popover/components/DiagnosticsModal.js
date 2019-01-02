import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import QueryDetail from './QueryDetail'
import { translate } from 'react-i18next'

const DiagnosticsModal = ({ isOpen, closeModal, content, t }) => (
  <Modal
    isOpen={isOpen}
    toggle={closeModal}
    wrapClassName="modal-primary diagnostic-modal">
    <ModalHeader toggle={closeModal}>{t('diagnostics')}</ModalHeader>
    <ModalBody>
      <QueryDetail info={content} />
    </ModalBody>
  </Modal>
)

export default translate('translations')(DiagnosticsModal)
