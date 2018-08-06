import {
  OPEN_MODAL,
  CLOSE_MODAL
} from './../actions/ModalActions';

const initialState = {
  open: false
}

const modal = function(state, action) {
  if(typeof state === typeof undefined) {
    state = initialState;
  }

  switch(action.type) {
    case OPEN_MODAL:
      state.open = true;
      state.modal = action.modal;
      return Object.assign({}, state);
    case CLOSE_MODAL:
      state.open = false;
      return Object.assign({}, state);
    default:
      return state;
  }
}

export default modal;
