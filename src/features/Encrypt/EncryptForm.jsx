import React, { useState } from 'react';
import StyleCard from './StyleCard';
import {
  AnimeShark,
  PaintingShark,
  CartoonShark,
  CyberpunkShark,
} from '../../assets/styleExamples/styleExamples';

export default function EncryptForm() {
  const [selectedStyle, setSelectedStyle] = useState('Cartoon');

  return (
    <form className="form encrypt-form">
      <div className="refresh">
        <label htmlFor="shark-name">
          Shark Name
          <input type="text" id="shark-name" />
        </label>
        <i className="fa-solid fa-arrows-rotate refresh-icon" />
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
        <textarea type="text" id="secret-message" />
      </label>
      <label htmlFor="secret-key" className="mt-md">
        Secret key
        <input type="text" id="secret-key" />
      </label>
      <div>
        <button type="button">Encrypt your message</button>
      </div>
    </form>
  );
}
