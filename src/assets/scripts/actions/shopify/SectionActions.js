import { createAsyncAction } from 'redux-promise-middleware-actions';
import ShopifySection from './../../shopify/ShopifySection';

export const FETCH_SECTIONS = 'FETCH_SECTIONS';

export const fetchIndexSections = createAsyncAction(FETCH_SECTIONS, async () => {
  return await ShopifySection.fetchIndexSections();
}, () => ({ group: 'index' }));

export const fetchSections = createAsyncAction(FETCH_SECTIONS, async(group) => {
  throw new Error("Not yet supported!");
}, () => ({ group }) );
