import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

export default function EncryptSucessModal({
  closeModal,
  closeOnBackdrop,
  secretKey,
  sharkName,
  sharkImageURL,
}) {
  return (
    <Modal
      title="Test"
      closeModal={closeModal}
      closeOnBackdrop={closeOnBackdrop}
      maxWidth="650px"
    >
      <p
        style={{
          marginTop: '1rem',
        }}
      >
        <h2>Message encyrypted successfully 🦈</h2>
        <div className="mt-md">
          <div className="info-label">Shark Name: </div>
          <div className="flex">
            <div className="info">{sharkName}</div>
            <button type="button" className="copy-button">
              <i className="fa-regular fa-copy" />
            </button>
          </div>
        </div>
        <div className="mt-md">
          <div className="info-label">Secret Key: </div>
          <div className="flex">
            <div className="info">{secretKey}</div>
            <button type="button" className="copy-button">
              <i className="fa-regular fa-copy" />
            </button>
          </div>
        </div>
        <div className="mt-md">
          <div className="info-label">Shark Image: </div>
          <div className="flex-center">
            <div className="image-wrapper">
              <img src={sharkImageURL} alt="shark" className="shark-image" />
            </div>
            <button type="button" className="download-button">
              Download image
              <i className="fa-solid fa-download" />
            </button>
          </div>
        </div>
      </p>
    </Modal>
  );
}

EncryptSucessModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  closeOnBackdrop: PropTypes.func.isRequired,
  secretKey: PropTypes.string.isRequired,
  sharkName: PropTypes.string.isRequired,
  sharkImageURL: PropTypes.string.isRequired,
};
