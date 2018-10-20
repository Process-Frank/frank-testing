import { templateFetch } from './../utils/URLUtilities';
import ShopifyCollection from './ShopifyCollection';

class ShopifyProduct {
  static async fetchProduct(product) {
    let data = await templateFetch(ShopifyProduct.getProductURL(product));
    return data;
  }

  static getProductURL(product, collection) {
    if(product.data && product.data.handle) product = product.data.handle;
    if(product.handle) product = product.handle;
    let end = '/products/' + product;
    if(collection) {
      return ShopfiyCollection.getCollectionURL(collection)+end;
    }
    return end;
  }

  static fromJSON(data) {
    let x = new ShopifyProduct(
      data.id, data.handle, data.image, data.options, data.price,
      data.tags, data.title, data.url, data.variants, data.vendor
    );
    return x;
  }

  //Instance
  constructor(
    id, handle, image, options, price, tags, title, url, variants, vendor
  ) {
    this.id = id;
    this.handle = handle;
    this.image = image;
    this.options = options || [];
    this.price = price;
    this.tags = tags || [];
    this.title = title;
    this.url = url;
    this.variants = variants;
  }

  getUrl(collection) {
    return ShopifyProduct.getProductURL(this, collection);
  }
}

export default ShopifyProduct;
