import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import DragDropFile from '../../components/DragDropFile/DragDropFile';
import DecryptSuccessModal from '../../components/Modal/DecryptSucessModal';
import ErrorModal from '../../components/Modal/ErrorModal';
import LoadingModal from '../../components/Modal/LoadingModal';

export default function DecryptForm() {
  const [sharkName, setSharkName] = useState('');
  const [secretMessage, setSecretMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [image, setImage] = useState(null);
  const [imageError, setimageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSecretMessage(null);
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
        setError(true);
      } else {
        setSecretMessage(result.secretMessage);
      }
    } catch (err) {
      setError(true);
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

  useEffect(() => {
    if (secretMessage) {
      setShowSuccessModal(true);
    }
  }, [secretMessage]);

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
      <p>
        {isLoading && (
          <LoadingModal showClose={false} message="Decrypting your message" />
        )}
      </p>
      {showSuccessModal && (
        <>
          <Confetti
            width={window.innerWidth - 100}
            height={window.innerHeight}
            recycle={false}
          />
          <DecryptSuccessModal
            closeModal={() => {
              setShowSuccessModal(false);
              setSecretMessage(null);
            }}
            secretMessage={secretMessage}
            copySecretMessage={() => navigator.clipboard.writeText(secretMessage)}
          />
        </>
      )}
      {error && (
        <ErrorModal
          title="Hello Imposter!"
          message="Please check your inputs."
          closeModal={() => setError(false)}
          showClose
        />
      )}
    </form>
  );
}
