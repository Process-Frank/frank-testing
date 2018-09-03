import * as CollectionActions from './../../actions/CollectionActions';
import * as ProductActions from './../../actions/ProductActions';
import ShopifyProduct from './../../shopify/ShopifyProduct';
import SimpleReducer from './SimpleReducer';

class ProductReducer extends SimpleReducer {
  constructor() {
    super(
      'products',
      'Products',
      'product',
      ProductActions.fetchProduct,
      ShopifyProduct.fromJSON
    );

    this.addEntry('Collections', CollectionActions.fetchCollection, 'productData');
  }
}

const ProductReducerInstance = new ProductReducer();

//TODO: Read data from collection actions here somewhere...
//I need to figure out a better way of telling the
//SimpleReducer about additional fetchers.. such as
//variants for products or say linklists from Sections?

export default ProductReducerInstance.getReducer();
