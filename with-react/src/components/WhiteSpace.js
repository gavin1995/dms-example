import React from 'react';
import PropTypes from 'prop-types';

const WhiteSpace = ({ top, color }) => <div className="white-space" style={color ? { width: '100%', height: `${top / 75}rem`, backgroundColor: color } : { width: '100%', height: `${top / 75}rem` }}></div>;

WhiteSpace.propTypes = {
  top: PropTypes.number,
  color: PropTypes.string,
};

WhiteSpace.defaultProps = {
  top: 20,
};

export default WhiteSpace;
