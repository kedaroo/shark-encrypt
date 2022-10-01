import React, { useState } from 'react';
import DragDropFile from '../../components/DragDropFile/DragDropFile';

export default function DecryptForm() {
  const [imageError, setimageError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || e.dataTransfer?.files[0];

    if (!selected) {
      setimageError('please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setimageError('selected file must be an image');
      return;
    }

    setimageError(null);
  };

  return (
    <form className="form encrypt-form">
      <div className="refresh">
        <label htmlFor="shark-name">
          Shark Name
          <input type="text" id="shark-name" />
        </label>
        <i className="fa-solid fa-arrows-rotate refresh-icon" />
      </div>
      <label htmlFor="secret-key" className="mt-md">
        Secret key
        <input type="text" id="secret-key" />
      </label>
      <DragDropFile handleChange={handleFileChange} />
      {imageError && <div className="error">{imageError}</div>}

      <div>
        <button type="button">Decrypt your message</button>
      </div>
    </form>
  );
}
