import React from 'react';
import PropTypes from 'prop-types';

export default function StyleCard({
  src,
  styleName,
  handleChange,
  checked,
}) {
  return (
    <label className="flex-col" htmlFor={styleName}>
      <div className="style-label">{styleName}</div>
      <img src={src} alt={`${styleName} Shark`} width={100} />
      <input
        checked={checked === styleName}
        type="radio"
        name="stylePrompt"
        value={styleName}
        id={styleName}
        onChange={(e) => handleChange(e.target.value)}
      />
    </label>
  );
}

StyleCard.propTypes = {
  src: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.node.isRequired,
};
