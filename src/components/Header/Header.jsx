import React from 'react';
import sharkImage from '../../assets/shark.png';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={sharkImage} alt="shark" />
        <span className="logo-title">sharkencrypt</span>
      </div>
      <i className="fa-regular fa-circle-question" />
    </header>
  );
}
