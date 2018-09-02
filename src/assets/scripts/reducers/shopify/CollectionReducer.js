import * as CollectionActions from './../../actions/CollectionActions';
import { asyncReducer } from 'redux-promise-middleware-actions';
import ShopifyCollection from '../../shopify/ShopifyCollection';

//Initial State
const initialState = {
  collections: {}
};

//Read data from the page's cache
if(typeof window.Collections !== typeof undefined) {
  let keys = Object.keys(window.Collections);
  for(let i = 0; i < keys.length; i++) {
    let handle = keys[i];
    initialState.collections[handle] = ShopifyCollection.fromJSON(window.Collections[handle]);
  }
}

//Setup our synchronous Reducers
const collection = (state, action) => {
  if(typeof state === typeof undefined) state = initialState;

  switch(action.type) {
    case String(CollectionActions.fetchCollection.pending):
      //Starting to fetch collection data.
      state = { ...state };
      state.collections = { ...state.collections };
      state.collections[action.meta.collection] = {
        ...state.collections[action.meta.collection],
        pending: true
      };
      return state;

    case String(CollectionActions.fetchCollection.fulfilled):
      //Collection data is fetching
      state = { ...state };
      state.collections = { ...state.collections };
      state.collections[action.meta.collection] = {
        ...ShopifyCollection.fromJSON(action.payload),
        pending: false,
        error: undefined
      };
      return state;

    case String(CollectionActions.fetchCollection.rejected):
      //Collection Data failed to fetch
      state = { ...state };
      state.collections = { ...state.collections };
      state.collections[action.meta.collection] = {
        pending: false,
        error: action.error
      };
      return state;

    default:
      return state;
  }
};

export default collection;
