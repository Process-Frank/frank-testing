export default class ShopifyBlock {

  static fromJSON(json) {
    let block = new ShopifyBlock(
      json.id,
      json.settings,
      json.type,
      json.shopify_attributes
    );
    return block;
  }

  //Instance
  constructor(id, settings, type, shopifyAttributes) {
    this.id = id;
    this.settings = settings;
    this.type = type;
    this.shopifyAttributes = shopifyAttributes;

    //TODO: Map settings into a common usable format
  }
}
