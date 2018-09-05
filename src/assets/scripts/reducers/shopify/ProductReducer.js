import * as CollectionActions from './../../actions/shopify/CollectionActions';
import * as ProductActions from './../../actions/shopify/ProductActions';
import ShopifyProduct from './../../shopify/ShopifyProduct';
import SimpleReducer from './SimpleReducer';

let ProductReducer = new SimpleReducer(
  'products',
  'Products',
  'product',
  ProductActions.fetchProduct,
  ShopifyProduct.fromJSON
);
ProductReducer.addEntry('Collections', CollectionActions.fetchCollection, 'productData');

export default ProductReducer.getReducer();
