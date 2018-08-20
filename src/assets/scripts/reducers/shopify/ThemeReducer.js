import ShopifyTheme from './../../shopify/ShopifyTheme';

if(typeof window.Theme === typeof undefined) throw new Error("Missing theme JSON information on the window!");

const initialState = ShopifyTheme.fromJSON(window.Theme);

//Finally we can actually make the reducer
const theme = function(state, action) {
  if(typeof state === typeof undefined) state = initialState;

  switch(action.type) {
    default: {
      return state;
    }
  }
}

export default theme;
