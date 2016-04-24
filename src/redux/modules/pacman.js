const KEY_PRESS = 'pacman/KEY_PRESS';
const SET_CONTEXT = 'pacman/SET_CONTEXT';
const WINDOW_RESIZE = 'pacman/WINDOW_RESIZE';

const initialState = {
  screen: {
    width: 100,
    height: 100
  },
  context: {},
  keys: {
    left: 0,
    right: 0,
    up: 0,
    down: 0,
    space: 0,
  },
  currentScore: 0,
  topScore: 0,
  inGame: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case KEY_PRESS:
      return {
        ...state,
        keys: {...state.keys, ...action.keys}
      };
    case SET_CONTEXT:
      return {
        ...state,
        context: action.context
      };
    case WINDOW_RESIZE:
      return {
        ...state,
        screen: {...state.screen, ...action.screen}
      };
    default:
      return state;
  }
}

export function keyPress(keys) {
  return { type: KEY_PRESS, keys };
}

export function setContext(context) {
  return { type: SET_CONTEXT, context };
}
export function windowResize(screen) {
  return { type: WINDOW_RESIZE, screen};
}
