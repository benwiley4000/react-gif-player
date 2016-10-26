import React from 'react';

import GifPlayer from './GifPlayer';

const preloadGif = src => {
  new Image().src = src;
};

class GifPlayerContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      playing: false
    };
    if (props.gif) {
      preloadGif(props.gif);
    }
  }

  componentDidMount (nextProps) {
    const oldGif = this.props.gif;
    const newGif = nextProps.gif;
    if (newGif && oldGif !== newGif) {
      preloadGif(newGif);
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
        playing={this.state.playing}
        toggle={() => this.toggle()}
      />
    );
  }
}

GifPlayerContainer.propTypes = {
  gif: React.PropTypes.string,
  still: React.PropTypes.string
};

export default GifPlayerContainer;
