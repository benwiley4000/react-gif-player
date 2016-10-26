import React from 'react';
import classNames from 'classnames';

import './GifPlayer.scss';

const GifPlayer = ({ gif, still, playing, toggle, ...rest }) => (
  <div
    className={classNames('gif_player', { 'playing': playing })}
    onClick={toggle}
  >
    <div className="play_button" />
    <img {...rest} src={playing ? (gif || still) : (still || gif)} />
  </div>
);

GifPlayer.propTypes = {
  gif: React.PropTypes.string,
  still: React.PropTypes.string,
  playing: React.PropTypes.bool,
  toggle: React.PropTypes.func
};

module.exports = GifPlayer;
