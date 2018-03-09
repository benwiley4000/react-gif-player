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
  static getDerivedStateFromProps (nextProps, prevState) {
    const prevGif = prevState.providedGif;
    const nextGif = nextProps.gif;
    const prevStill = prevState.providedStill;
    const nextStill = nextProps.still;
    if (prevGif === nextGif && prevStill === nextStill) {
      return null;
    }

    return {
      playing: nextGif && nextProps.autoplay && oldGif !== nextGif
        ? true
        : prevState.playing,
      providedGif: nextGif,
      providedStill: nextStill,
      actualGif: nextGif,
      actualStill: nextStill
    };
  }

  constructor (props) {
    super(props);
    this.state = {
      playing: Boolean(props.autoPlay),
      providedGif: props.gif,
      providedStill: props.still,
      actualGif: props.gif,
      actualStill: props.still
    };
    this.updateId = -1;
  }

  componentDidMount () {
    if (typeof this.props.pauseRef === 'function') {
      this.props.pauseRef(() => this.setState({ playing: false }));
    }
    this.updateImages(this.props);
  }

  // fallback for pre-React 16.3
  componentWillReceiveProps (nextProps) {
    const nextState =
      this.constructor.getDerivedStateFromProps(nextProps, this.state);
    if (nextState) {
      this.setState(nextState);
    }
  }

  componentDidUpdate (prevProps, prevState) {
    this.updateImages(prevState);
  }

  updateImages (prevState = {}) {
    const { providedGif, providedStill } = this.state;
    if (
      providedGif &&
      !providedStill &&
      providedGif !== prevState.providedGif
    ) {
      const updateId = ++this.updateId;
      preload(providedGif, img => {
        if (this.updateId === updateId) {
          const actualStill = firstGifFrameUrl(img);
          if (actualStill) {
            this.setState({ actualStill });
          }
        }
      });
    }
  }

  toggle () {
    this.setState({
      playing: !this.state.playing
    });
  }

  render () {
    const {
      actualGif,
      actualStill,
      providedGif,
      providedStill,
      playing
    } = this.state;
    return (
      <GifPlayer
        gif={actualGif || providedGif}
        still={actualStill || providedStill}
        playing={playing}
        toggle={() => this.toggle()}
      />
    );
  }
}

// if we're at 16.3 or greater, let's remove componentWillReceiveProps to
// avoid warning messages
const reactBaseVersion = (React.version || '').split('-')[0];
const splitVersion = reactBaseVersion.split('.');
if (Number(splitVersion[0]) >= 16 && Number(splitVersion[1]) >= 3) {
  delete GifPlayerContainer.prototype.componentWillReceiveProps;
}

GifPlayerContainer.propTypes = {
  gif: PropTypes.string,
  still: PropTypes.string,
  autoplay: PropTypes.bool,
  pauseRef: PropTypes.func,
};

module.exports = GifPlayerContainer;
