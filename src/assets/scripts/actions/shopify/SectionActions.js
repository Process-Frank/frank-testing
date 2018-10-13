import { createAsyncAction } from 'redux-promise-middleware-actions';
import ShopifySection from './../../shopify/ShopifySection';

export const FETCH_SECTIONS = 'FETCH_SECTIONS';

export const fetchIndexSections = createAsyncAction(
  FETCH_SECTIONS,
  () => ShopifySection.fetchIndexSections(),
  () => ({ group: 'index' })
);

export const fetchSections = createAsyncAction(
  FETCH_SECTIONS,
  (group) => { throw new Error("Not yet supported!"); },
  () => ({ group })
);
