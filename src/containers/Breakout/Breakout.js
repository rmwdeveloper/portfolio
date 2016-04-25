import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as widgetActions from 'redux/modules/breakout';
import { Paddle } from 'components';
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
    screen: state.breakout.screen,
    context: state.breakout.context,
    keys: state.breakout.keys,
    currentScore: state.breakout.currentScore,
    topScore: state.breakout.topScore,
    inGame: state.breakout.inGame
  }),
  {...widgetActions})
export default class Breakout extends Component {
  static propTypes = {
    screen: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    keys: PropTypes.object.isRequired,
    currentScore: PropTypes.number.isRequired,
    topScore: PropTypes.number.isRequired,
    inGame: PropTypes.bool.isRequired,
    keyPress: PropTypes.func.isRequired,
    windowResize: PropTypes.func.isRequired,
    setContext: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired
  };
  constructor() {
    super();
  }
  componentWillMount() {
    this.handleResize();
  }
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize', this.handleResize.bind(this, false));

    const context = this.refs.canvas.getContext('2d');
    this.props.setContext(context);
    this.startGame();
    requestAnimationFrame(() => {this.update();});
  }
  generateMap() {
    console.log(Paddle);
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
  startGame() {
    const {startGame, screen: {width, height}} = this.props;
    startGame();
    this.generateMap();
    this.paddle = new Paddle({
      x: width / 2,
      y: height / 2
    });
  }
  update() {
    const { context, screen: { width, height } } = this.props;
    context.fillStyle = '#0000FF';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, width, height);
    context.globalAlpha = 1;
    console.log('rendering');
    requestAnimationFrame(() => {this.update();});
  }
  render() {
    const { screen: { width, height }} = this.props;
    return <canvas ref="canvas" width={width} height={height} />;
  }
}
