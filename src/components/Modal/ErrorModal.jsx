import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import EatingShark from '../../assets/eatingshark.gif';

export default function ErrorModal({
  title,
  message,
  showClose,
  closeModal,
}) {
  return (
    <Modal
      title="Test"
      closeModal={closeModal}
      showClose={showClose}
      maxWidth="400px"
    >
      <img src={EatingShark} alt="shark dance" className="loading-gif" />
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.25rem',
          marginTop: '1rem',
        }}
      >
        {title}
      </p>
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          marginTop: '0.5rem',
        }}
      >
        {message}
      </p>
    </Modal>
  );
}

ErrorModal.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showClose: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
