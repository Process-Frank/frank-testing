//import ShopifyShop from './../../shopify/ShopifyShop';

let initialState = {};
if(typeof window.Shop !== typeof undefined) initialState = window.Shop;

const shop = (state, actions) => {
  if(typeof state === typeof undefined) state = initialState;

  return state;
};

export default shop;
