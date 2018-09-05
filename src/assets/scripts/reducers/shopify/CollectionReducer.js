import * as CollectionActions from './../../actions/shopify/CollectionActions';
import ShopifyCollection from '../../shopify/ShopifyCollection';
import SimpleReducer from './SimpleReducer';

const CollectionReducer = new SimpleReducer(
  'collections',
  'Collections',
  'collection',
  CollectionActions.fetchCollection,
  ShopifyCollection.fromJSON
);

export default CollectionReducer.getReducer();
