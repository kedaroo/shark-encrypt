import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

export default function DecryptSuccessModal({
  closeModal,
  secretMessage,
  copySecretMessage,
}) {
  return (
    <Modal
      title="Test"
      closeModal={closeModal}
      showClose
      maxWidth="500px"
    >
      <p
        style={{
          marginTop: '1rem',
        }}
      >
        <h2>Message decrypted successfully 🦈</h2>
        <div className="mt-md">
          <div className="info-label">Secret message: </div>
          <div className="flex-center">
            <textarea value={secretMessage} rows={4} readOnly />
            <button type="button" className="download-button" style={{ marginTop: '1.5rem' }} onClick={copySecretMessage}>
              Copy to clipboard
              <i className="fa-regular fa-copy" />
            </button>
          </div>
        </div>
      </p>
    </Modal>
  );
}

DecryptSuccessModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  secretMessage: PropTypes.string.isRequired,
  copySecretMessage: PropTypes.func.isRequired,
};
