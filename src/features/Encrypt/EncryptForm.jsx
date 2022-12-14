import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import StyleCard from './StyleCard';
import {
  AnimeShark,
  PaintingShark,
  CartoonShark,
  CyberpunkShark,
} from '../../assets/styleExamples/styleExamples';
import generateSharkName from '../../utils/sharkNameGenerator';
import LoadingModal from '../../components/Modal/LoadingModal';
import EncryptSucessModal from '../../components/Modal/EncryptSucessModal';

export default function EncryptForm() {
  const [selectedStyle, setSelectedStyle] = useState('Cartoon');
  const [sharkName, setSharkName] = useState('');
  const [secretMessage, setSecretMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setSharkName(generateSharkName());
  }, []);

  const API_ENDPOINT = 'https://shark-encrypt.herokuapp.com/api/v1/encryptMessage';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setImgUrl(null);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          sharkName,
          secretMessage,
          secretKey,
          selectedStyle,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const json = await response.json();
      setImgUrl(json.imgUrl);
    } catch (err) {
      setError('An error occured. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    fetch(imgUrl, {
      method: 'GET',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Shark Encrypt.png');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  useEffect(() => {
    if (imgUrl) {
      setShowSuccessModal(true);
    }
  }, [imgUrl]);

  return (
    <form className="form encrypt-form" onSubmit={handleSubmit}>
      <div className="refresh">
        <label htmlFor="shark-name">
          Shark Name
          <input type="text" value={sharkName} readOnly id="shark-name" />
        </label>
        <i
          className="fa-solid fa-arrows-rotate refresh-icon"
          aria-hidden="true"
          onClick={() => setSharkName(generateSharkName())}
        />
      </div>
      <div className="shark-styles-label">Select Shark Style</div>
      <div className="shark-styles">
        <StyleCard
          src={CartoonShark}
          handleChange={setSelectedStyle}
          styleName="Cartoon"
          checked={selectedStyle}
        />
        <StyleCard
          src={PaintingShark}
          handleChange={setSelectedStyle}
          styleName="Painting"
          checked={selectedStyle}
        />
        <StyleCard
          src={AnimeShark}
          handleChange={setSelectedStyle}
          styleName="Anime"
          checked={selectedStyle}
        />
        <StyleCard
          src={CyberpunkShark}
          handleChange={setSelectedStyle}
          styleName="Cyberpunk"
          checked={selectedStyle}
        />
      </div>
      <label htmlFor="secret-message" className="mt-md">
        Secret message
        <textarea
          type="text"
          required
          value={secretMessage}
          onChange={(e) => setSecretMessage(e.target.value)}
          id="secret-message"
        />
      </label>
      <label htmlFor="secret-key" className="mt-md">
        Secret key
        <input
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          id="secret-key"
        />
      </label>
      <div>
        <button type="submit">Encrypt your message</button>
      </div>
      {isLoading && (
        <LoadingModal showClose={false} message="Encrypting your message" />
      )}
      {error && <div>{error}</div>}
      {showSuccessModal && (
        <>
          <Confetti
            width={window.innerWidth - 100}
            height={window.innerHeight}
            recycle={false}
          />
          <EncryptSucessModal
            closeModal={() => setShowSuccessModal(false)}
            closeOnBackdrop={() => setShowSuccessModal(false)}
            secretKey={secretKey}
            sharkName={sharkName}
            sharkImageURL={imgUrl}
            copySharkName={() => navigator.clipboard.writeText(sharkName)}
            copySecretKey={() => navigator.clipboard.writeText(secretKey)}
            handleDownload={handleDownload}
          />
        </>
      )}
    </form>
  );
}
