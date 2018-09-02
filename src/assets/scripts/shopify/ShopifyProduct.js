import { templateFetch } from './../utils/URLUtilities';
import ShopifyCollection from './ShopifyCollection';

class ShopfiyProduct {
  static async fetchProduct(collection) {
    let data = await templateFetch(ShopifyCollection.getCollectionURL(collection));
    return data;
  }

  static getProductURL(product, collection) {
    let end = '/product/' + product;
    if(collection) return ShopfiyCollection.getCollectionURL(collection)+end;
    return end;
  }

  static fromJSON(data) {
    let x = new ShopfiyProduct(
      data.id, data.handle, data.all_tags, data.default_sort_by,
      data.description, data.image, data.products, data.template_suffix,
      data.title, data.url
    );
    return x;
  }

  //Instance
  constructor(
    id, handle, tags, default_sort, description, image, products,
    template_suffix, title, url
  ) {
    this.id = id;
    this.handle = handle;
    this.tags = tags || [];
    this.default_sort = default_sort || "manual";
    this.description = description || null;
    this.image = image || null;
    this.products = products || [];
    this.template_suffix = template_suffix || null;
    this.title = title;
    url = url || ShopifyCollection.getCollectionURL(this.handle);
  }
}

export default ShopfiyProduct;
