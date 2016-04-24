import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    screen: state.pacman.screen,
    context: state.pacman.context,
    keys: state.pacman.keys,
    currentScore: state.pacman.currentScore,
    topScore: state.pacman.topScore,
    inGame: state.pacman.inGame
  })
)
export default class Pacman extends Component {
  static propTypes = {
    screen: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    keys: PropTypes.object.isRequired,
    currentScore: PropTypes.number.isRequired,
    topScore: PropTypes.number.isRequired,
    inGame: PropTypes.bool.isRequired
  };
  render() {
    const { screen: { width, height } } = this.props;
    return (
      <div>
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}
