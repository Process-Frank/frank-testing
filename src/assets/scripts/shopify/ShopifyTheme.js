const prepareUrl = (url) => {
  return url.replace(/http(s)?:/, '').split('?')[0];
}

export default class ShopifyTheme {
  static fromJSON(jsonData) {
    return new ShopifyTheme(
      jsonData.id,
      jsonData.name,
      jsonData.assetUrl,
      jsonData.fileUrl
    );
  }

  //Instance
  constructor(id, name, assetUrl, fileUrl) {
    if(typeof id === typeof undefined) throw new Error("ID cannot be undefined!");
    if(typeof name === typeof undefined || !name.length) throw new Error("Theme name cannot be empty!");
    if(typeof assetUrl === typeof undefined || !assetUrl) throw new Error("Asset URL cannot be empty!");
    if(typeof fileUrl === typeof undefined || !fileUrl) throw new Error("File URL cannot be empty!");

    this.id = id;
    this.name = name;
    this.assetUrl = prepareUrl(assetUrl);//Strip crap.
    this.fileUrl = prepareUrl(fileUrl);

    //Cache Time, used for assets
    this.cacheTime = new Date().getTime();
  }

  getID() { return this.id; }
  getName() { return this.name; }
  getAssetURL() { return this.assetUrl; }
  getFileURL() { return this.fileUrl; }

  //Methods for getting various assets
  getAsset(asset) {
    return this.getAssetURL() + asset + '?' + this.cacheTime;
  }

  getFile(file) {
    return this.getFileURL() + file + '?' + this.cacheTime;
  }

  //Shorthand for "detecting" type.
  get(thing, from) {
    if(from == 'asset') return this.getAsset(thing);
    if(from == 'file') return this.getFile(thing);
  }
  
  isShopifyImageType(src) {
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

    let match = this.isShopifyImageType(src);
    if (match) {
      let prefix = src.split(match[0]);
      let suffix = match[0];

      return prefix[0] + '_' + size + suffix;
    } else {
      return src;
    }
  }
}
