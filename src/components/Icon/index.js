import React from 'react';
import PropTypes from 'prop-types';
import './less/icon.less';

const Icon = ({ glyph, className, width, height, style }) => (
  <svg className={className} width={width} height={height} style={style} viewBox={glyph.viewBox}>
    <use xlinkHref={`#${glyph.id}`} />
  </svg>
);

Icon.propTypes = {
  glyph: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};

Icon.defaultProps = {
  glyph: {},
  className: 'icon',
  width: 1,
  height: 1
};
export default Icon;

export { default as logoText } from './images/logo-text.svg';
export { default as logo } from './images/logo.svg';
export { default as about } from './images/about.svg';
export { default as add } from './images/add.svg';
export { default as back } from './images/back.svg';
export { default as setting } from './images/setting.svg';
export { default as show } from './images/show.svg';
export { default as export } from './images/export.svg';
export { default as save } from './images/save.svg';

export { default as chrome } from './images/chrome.svg';
export { default as firefox } from './images/firefox.svg';
export { default as safari } from './images/safari.svg';
export { default as explorer } from './images/explorer.svg';
