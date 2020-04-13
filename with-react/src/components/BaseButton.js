import React from 'react';
import PropTypes from 'prop-types';

import styled from '../utils/styled';

const gradientColor = {
  gold: {
    backgroundImage: 'linear-gradient(90deg, #C9B178 0%, #C3A86E 99%)',
  },
  primary: {
    backgroundImage: 'linear-gradient(-135deg, #6987F0 0%, #4B6BE5 100%)',
  },
  danger: {
    backgroundImage: 'linear-gradient(-135deg, #FF6F3D 0%, #FF554A 100%)',
  },
  black: {
    backgroundImage: 'linear-gradient(-135deg, #000000, #1C1C1C)',
  },
};

const SCBaseButton = styled.div`
    display: block;
    width: 100%;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background: ${props => props.disabled ? '#dddddd' : gradientColor[props.type].backgroundImage};
    border-radius: 5rem;
    font-size: 32px;
    color: #ffffff;
`;

const BaseButton = ({disabled, children, onClick, type, ghost, width, height, style, ...params}) => {
  return (
    <SCBaseButton
      {...params}
      type={type}
      ghost={ghost}
      disabled={disabled}
      onClick={disabled ? void 0 : onClick}
      style={{
        ...style,
        width: `${width/ 75}rem`,
        height: `${height/ 75}rem`
      }}
    >
      {
        children
      }
    </SCBaseButton>
  );
};

BaseButton.propTypes = {
  disable: PropTypes.bool,
  type: PropTypes.oneOf([
    'gold',
    'primary',
    'danger',
    'black'
  ]),
  onClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  jumpTo: PropTypes.string,
};

BaseButton.defaultProps = {
  disabled: false,
  type: 'gold',
  style: {},
};

export default BaseButton;
