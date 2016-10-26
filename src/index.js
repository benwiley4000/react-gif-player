import React from 'react';
import classNames from 'classnames';

const GifPlayer = ({ gif, still, playing, ...rest }) => (
  <div className={classNames('gif_player', { 'playing': playing })}>
    <div className='play_button' />
    <img {...rest} src={playing ? gif : still} />
  </div>
);

export default GifPlayer;
