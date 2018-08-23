import {
  OPEN_MENU,
  CLOSE_MENU,
  TOGGLE_MENU
} from './../actions/HamburgerMenuActions';

const initialState = {
  open: false
};

const hamburgerMenu = function(state, action) {
  if(typeof state === typeof undefined) {
    state = initialState;
  }

  switch(action.type) {
    case OPEN_MENU:
      state.open = true;
      return Object.assign({}, state);
    case CLOSE_MENU:
      state.open = false;
      return Object.assign({}, state);
    case TOGGLE_MENU:
      state.open = !state.open;
      return Object.assign({}, state);
    default:
      return state;
  }
}

export default hamburgerMenu;
