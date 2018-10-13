import Language from './../../language/Language';
const initialState = Language.getLanguage("en");//TODO: Fetch via the store's locale setting...

const language = function(state, action) {
  if(typeof state === typeof undefined) {
    state = initialState;
  }

  switch(action.type) {
    default:
      return state;
  }
}

export default language;
