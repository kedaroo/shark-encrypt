import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export default function DragDropFile({ handleChange }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer?.files[0].name);
      handleChange(e);
      // handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleFileChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files[0]) {
      handleChange(e);
      setFileName(e.target.files[0].name);
      // handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div id="form-file-upload" onDragEnter={handleDrag}>
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        accept="image/png"
        onChange={handleFileChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? 'drag-active' : ''}
      >
        <div>
          {fileName && <p>{fileName}</p>}
          <p>Drag and drop your file here or</p>
          <button
            className="upload-button"
            onClick={onButtonClick}
            type="button"
          >
            Upload a file
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </div>
  );
}

DragDropFile.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
