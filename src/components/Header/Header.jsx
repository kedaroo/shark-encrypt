import React from 'react';
import sharkImage from '../../assets/shark1.png';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={sharkImage} alt="shark" />
        {/* <span className="logo-title">encrypt</span> */}
      </div>
      <i className="fa-regular fa-circle-question" />
    </header>
  );
}
