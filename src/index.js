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
  }

  componentDidMount() {
    const { gif } = this.props;
    if (gif) {
      preloadGif(gif);
    }
  }

  componentWillReceiveProps (nextProps) {
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

module.exports = GifPlayerContainer;
