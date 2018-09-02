import { createAsyncAction } from 'redux-promise-middleware-actions';
import ShopifyProduct from './../shopify/ShopifyProduct';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';

export const fetchProduct = createAsyncAction('FETCH_PRODUCT', async (product) => {
  return await ShopifyProduct.fetchProduct(product);
}, (product) => ({ product }) );
