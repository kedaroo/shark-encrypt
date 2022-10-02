import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function Modal({
  closeModal,
  children,
  maxWidth,
  showClose,
}) {
  return ReactDOM.createPortal(
    <div
      className="modal-background"
      aria-hidden="true"
    >
      <div className="modal" style={{ maxWidth }}>
        <div className="modal-content">
          {showClose && (
            <button
              className="modal-close-btn"
              onClick={closeModal}
              type="button"
            >
              <i className="fas fa-times txt-red" id="modal-dismiss-btn" />
            </button>
          )}

          <div className="txt-dark-gray lh-md">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string.isRequired,
  showClose: PropTypes.bool.isRequired,
};
