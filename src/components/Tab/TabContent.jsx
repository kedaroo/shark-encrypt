import React from 'react';
import PropTypes from 'prop-types';

export default function TabContent({ id, activeTab, children }) {
  return activeTab === id ? (
    <div className="tab-content">{children}</div>
  ) : null;
}

TabContent.propTypes = {
  id: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
