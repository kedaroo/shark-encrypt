import React, { useState } from 'react';
import DragDropFile from '../../components/DragDropFile/DragDropFile';

export default function DecryptForm() {
  const [sharkName, setSharkName] = useState('');
  const [secretMessage, setSecretMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [image, setImage] = useState(null);
  const [imageError, setimageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const formData = new FormData(e.target);
    formData.append('File', image);

    const url = 'https://shark-encrypt.herokuapp.com/api/v1/decryptMessage';

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (!result.success) {
        setError('Image could not be decrypted');
      } else {
        setSecretMessage(result.secretMessage);
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    setImage(null);
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
    setImage(selected);
  };

  return (
    <form className="form encrypt-form" onSubmit={handleSubmit}>
      <div className="refresh">
        <label htmlFor="shark-name">
          Shark Name
          <input
            name="sharkName"
            required
            value={sharkName}
            type="text"
            onChange={(e) => setSharkName(e.target.value)}
            id="shark-name"
          />
        </label>
        <i className="fa-solid fa-arrows-rotate refresh-icon" />
      </div>
      <label htmlFor="secret-key" className="mt-md">
        Secret key
        <input
          required
          name="secretKey"
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          id="secret-key"
        />
      </label>
      <DragDropFile handleChange={handleFileChange} />
      {imageError && <div className="error">{imageError}</div>}

      <div>
        <button type="submit">Decrypt your message</button>
      </div>
      <p>{error}</p>
      <p>{isLoading}</p>
      {secretMessage && <p>{secretMessage}</p>}
    </form>
  );
}
