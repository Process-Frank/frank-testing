export default class ShopifyTheme {

  static fromJSON(jsonData) {
    return new ShopifyTheme(
      jsonData.id,
      jsonData.name,
      jsonData.assetUrl
    );
  }

  //Instance
  constructor(id, name, assetUrl) {
    if(typeof id === typeof undefined) throw new Error("ID cannot be undefined!");
    if(typeof name === typeof undefined || !name.length) throw new Error("Theme name cannot be empty!");
    if(typeof assetUrl === typeof undefined) throw new Error("Asset URL cannot be empty!");

    this.id = id;
    this.name = name;
    this.assetUrl = assetUrl.replace(/http(s)?:/, '');//Strip protocol.

    //Cache Time, used for assets
    this.cacheTime = new Date().getTime();
  }

  getID() { return this.id; }
  getName() { return this.name; }
  getAssetURL() { return this.assetUrl; }

  //Methods for getting various assets
  getAsset(asset) {
    return this.getAssetURL() + asset + '?' + this.cacheTime;
  }

  isShopifyImage(src) {
    return src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
  }

  getImageURL(src, size) {
    size = size + "";//To String

    //Is it a "static" size?
    if (size === null || !size.length || size == 'master') {
      return this.getAsset(src);
    }

    //Must end with x, e.g. 1400x
    if(!size.endsWith("x")) size += "x";

    let match = this.isShopifyImage(src);
    if (match) {
      let prefix = src.split(match[0]);
      let suffix = match[0];

      return this.getAsset(prefix[0] + '_' + size + suffix);
    } else {
      return this.getAsset(src);
    }
  }
}
