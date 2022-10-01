import React from 'react';
import PropTypes from 'prop-types';

export default function TabNavItem({
  id,
  title,
  activeTab,
  setActiveTab,
  icon,
}) {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={activeTab === id ? 'tab active' : 'tab'}
        type="submit"
      >
        {icon && <i className={icon} />}
        {title}
      </button>
    </li>
  );
}

TabNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};
