import * as CollectionActions from './../../actions/CollectionActions';
import * as ProductActions from './../../actions/ProductActions';
import { asyncReducer } from 'redux-promise-middleware-actions';
import ShopifyProduct from './../../shopify/ShopifyProduct';

const initialState = {
  products: {}
}

//Read data from the page's cache
if(typeof window.Products !== typeof undefined) {
  let keys = Object.keys(window.Products);
  for(let i = 0; i < keys.length; i++) {
    let handle = keys[i];
    initialState.products[handle] = ShopifyProduct.fromJSON(window.Products[handle]);
  }
}

//Collection Data may have product data as well.
if(typeof window.Collections !== typeof undefined) {
  let keys = Object.keys(window.Collections);
  for(let i = 0; i < keys.length; i++) {
    let handle = keys[i];
    let collection = window.Collections[handle];
    if(typeof collection === typeof undefined) continue;
    if(typeof collection.productData === typeof undefined) continue;
    for(let x = 0; x < collection.productData.length; x++) {
      let p = collection.productData[x];
      initialState.products[p.handle] = ShopifyProduct.fromJSON(p);
    }
  }
}


const product = (state, action) => {
  if(typeof state === typeof undefined) state = initialState;

  //Remember that our actions can be product specific or they can be collection
  //reduced as well.
  switch(action.type) {
    //Product Actions:
      case String(ProductActions.fetchProduct.pending):
        //Starting to fetch product data.
        state = { ...state };
        state.products = { ...state.collections };
        state.products[action.meta.product] = {
          ...state.products[action.meta.product],
          pending: true
        };
        return state;

      case String(ProductActions.fetchProduct.fulfilled):
        //Product data is fetching
        state = { ...state };
        state.products = { ...state.collections };
        state.products[action.meta.product] = {
          ...ShopifyProduct.fromJSON(action.payload),
          pending: false,
          error: undefined
        };
        return state;

      case String(ProductActions.fetchProduct.rejected):
        //Collection Data failed to fetch
        state = { ...state };
        state.products = { ...state.collections };
        state.products[action.meta.product] = {
          pending: false,
          error: action.error
        };
        return state;


    //Collection Actions:
    case String(CollectionActions.fetchCollection.fulfilled):
      state = { ...state };
      state.products = { ...state.products };
      //Check if the collection has products
      if(action.payload && action.payload.productData) {
        for(let i = 0; i < action.payload.productData.length; i++) {
          let p = action.payload.productData[i];
          state.products[p.handle] = ShopifyProduct.fromJSON(p);
          state.products[p.handle].pending = false;
          state.products[p.handle].error = undefined;
        }
      }
      return state;

    default:
      return state;
  }
};

export default product;
