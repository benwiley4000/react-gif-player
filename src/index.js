import React from 'react';
import PropTypes from 'prop-types';

import GifPlayer from './GifPlayer';

const preload = (src, callback) => {
  var img = new Image();
  if (typeof callback === 'function') {
    img.onload = () => callback(img);
    img.setAttribute('crossOrigin', 'anonymous');
  }
  img.src = src;
};

const firstGifFrameUrl = img => {
  const canvas = document.createElement('canvas');
  if (typeof canvas.getContext !== 'function') {
    return null;
  }
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL();
}

class GifPlayerContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      playing: Boolean(props.autoPlay),
      gif: props.gif,
      still: props.still
    };
    this.updateId = -1;
  }

  componentDidMount () {
    if (typeof this.props.pauseRef === 'function') {
      this.props.pauseRef(() => this.setState({ playing: false }));
    }
    this.updateImages(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.updateImages(nextProps, this.props);
  }

  updateImages (newProps, oldProps = {}) {
    const oldGif = oldProps.gif;
    const newGif = newProps.gif;
    const oldStill = oldProps.still;
    const newStill = newProps.still;
    if (oldGif === newGif && oldStill === newStill) {
      return;
    }

    const updateId = ++this.updateId;
    this.setState({
      gif: newGif,
      still: newStill
    });

    if (newGif && oldGif !== newGif) {
      if (newProps.autoplay) {
        this.setState({
          playing: true
        });
      }
      preload(newGif, img => {
        if (!newStill && this.updateId === updateId) {
          const still = firstGifFrameUrl(img);
          if (still) {
            this.setState({ still });
          }
        }
      });
    }
    if (newStill && oldStill !== newStill) {
      preload(newStill);
    }
  }

  toggle () {
    this.setState({
      playing: !this.state.playing
    });
  }

  render () {
    return (
      <GifPlayer
        {...this.props}
        {...this.state}
        toggle={() => this.toggle()}
      />
    );
  }
}

GifPlayerContainer.propTypes = {
  gif: PropTypes.string,
  still: PropTypes.string,
  autoplay: PropTypes.bool,
  pauseRef: PropTypes.func,
};

module.exports = GifPlayerContainer;
