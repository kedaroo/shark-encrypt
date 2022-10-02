import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Modal({
  closeModal,
  closeOnBackdrop,
  children,
  maxWidth,
}) {
  return ReactDOM.createPortal(
    <div
      className="modal-background"
      onClick={closeOnBackdrop}
      aria-hidden="true"
    >
      <div className="modal" style={{ maxWidth }}>
        <div className="modal-content">
          <button
            className="modal-close-btn"
            onClick={closeModal}
            type="button"
          >
            <i className="fas fa-times txt-red" id="modal-dismiss-btn" />
          </button>
          <div className="txt-dark-gray lh-md">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  closeOnBackdrop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string.isRequired,
};
