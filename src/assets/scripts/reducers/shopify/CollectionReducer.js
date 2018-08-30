import * as CollectionActions from './../../actions/CollectionActions';
import { asyncReducer } from 'redux-promise-middleware-actions';
import ShopifyCollection from '../../shopify/ShopifyCollection';

//Initial State
const initialState = {
  currentCollection: 'all',
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
      state = { ...state };
      state.collections = { ...state.collections };
      state.collections[action.meta.collection] = {
        ...state.collections[action.meta.collection],
        pending: true
      };
      return state;

    case String(CollectionActions.fetchCollection.fulfilled):
      state = { ...state };
      state.collections = { ...state.collections };
      state.collections[action.meta.collection] = {
        ...action.payload,
        pending: false,
        error: undefined
      };
      return state;

    case String(CollectionActions.fetchCollection.rejected):
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
