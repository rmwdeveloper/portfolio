import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as widgetActions from 'redux/modules/pacman';

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  A: 65,
  D: 68,
  W: 87,
  S: 83,
  SPACE: 32
};

@connect(
  state => ({
    screen: state.pacman.screen,
    context: state.pacman.context,
    keys: state.pacman.keys,
    currentScore: state.pacman.currentScore,
    topScore: state.pacman.topScore,
    inGame: state.pacman.inGame
  }),
  {...widgetActions})
export default class Pacman extends Component {
  static propTypes = {
    screen: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    keys: PropTypes.object.isRequired,
    currentScore: PropTypes.number.isRequired,
    topScore: PropTypes.number.isRequired,
    inGame: PropTypes.bool.isRequired,
    keyPress: PropTypes.func.isRequired,
    windowResize: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.pacman = [];
  }
  componentWillMount() {
    this.handleResize();
  }
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize', this.handleResize.bind(this, false));
  }
  handleKeys(value, e) {
    const { keys, keyPress } = this.props;
    if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
    if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
    if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
    if (e.keyCode === KEY.DOWN || e.keyCode === KEY.S) keys.down = value;
    if (e.keyCode === KEY.SPACE) keys.space = value;
    keyPress(keys);
  }
  handleResize() {
    const screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.props.windowResize(screen);
  }
  render() {
    const { screen: { width, height } } = this.props;
    return (
      <div>
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}
