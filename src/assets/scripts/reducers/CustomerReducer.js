const initialState = null;

//Finally we can actually make the reducer
const customer = function(state, action) {
  if(typeof state === typeof undefined) state = initialState;

  switch(action.type) {
    default: {
      return state;
    }
  }
}

export default customer;
