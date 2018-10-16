import { createAsyncAction } from 'redux-promise-middleware-actions';
import ShopifyCollection from './../../shopify/ShopifyCollection';

export const FETCH_COLLECTION = 'FETCH_COLLECTION';

export const fetchCollection = createAsyncAction(
  FETCH_COLLECTION,
  (collection) => ShopifyCollection.fetchCollection(collection),
  (collection) => ({ collection })
);
