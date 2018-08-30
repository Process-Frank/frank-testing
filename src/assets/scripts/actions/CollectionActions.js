import { createAsyncAction } from 'redux-promise-middleware-actions';
import ShopifyCollection from './../shopify/ShopifyCollection';

export const FETCH_COLLECTION = 'FETCH_COLLECTION';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
export const SELECT_COLLECTION = "SELECT_COLLECTION";

export function selectCollection(collection) {
  return {
    type: SELECT_COLLECTION,
    collection
  }
}

export const fetchCollection = createAsyncAction('FETCH_COLLECTION', async (collection) => {
  return await ShopifyCollection.fetchCollection(collection);
}, (collection) => ({ collection }) );
