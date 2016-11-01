import React from 'react';

import GifPlayer from './GifPlayer';

const preload = src => {
  new Image().src = src;
};

class GifPlayerContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      playing: false
    };
  }

  componentDidMount () {
    const { gif, still } = this.props;
    if (gif) {
      preload(gif);
    }
    if (still) {
      preload(still);
    }
  }

  componentWillReceiveProps (nextProps) {
    const oldGif = this.props.gif;
    const newGif = nextProps.gif;
    if (newGif && oldGif !== newGif) {
      preload(newGif);
    }
    const oldStill = this.props.still;
    const newStill = nextProps.still;
    if (newStill && newStill !== oldStill) {
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

module.exports = GifPlayerContainer;
