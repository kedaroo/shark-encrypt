import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import SharkDance from '../../assets/sharkdance.gif';

export default function LoadingModal({
  message,
  showClose,
}) {
  return (
    <Modal
      title="Test"
      closeModal={() => {}}
      closeOnBackdrop={() => {}}
      showClose={showClose}
      maxWidth="400px"
    >
      {/* <iframe
        src="https://giphy.com/embed/3o72FkreWNH9OlTtPq"
        width="100%"
        height="100%"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
        title="Shark"
      /> */}
      <img src={SharkDance} alt="shark dance" className="loading-gif" />
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.25rem',
          marginTop: '1rem',
        }}
      >
        {message}
      </p>
    </Modal>
  );
}

LoadingModal.propTypes = {
  message: PropTypes.string.isRequired,
  showClose: PropTypes.bool.isRequired,
};
