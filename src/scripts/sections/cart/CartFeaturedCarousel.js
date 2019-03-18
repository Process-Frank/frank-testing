import * as ResponsiveSizes from './../../settings/Responsive';
import { FeaturedCollectionCarousel } from './../collection/FeaturedCollectionCarousel';
import { register } from './../ShopifySection';

export const CONTAINER_SELECTOR = '[data-cart-featured-collection]';
export const PRODUCTS_SELECTOR = '[data-cart-featured-collection-carousel]';

export class CartFeaturedCarousel extends FeaturedCollectionCarousel {
  getProductsContainer() { return this.container.find(PRODUCTS_SELECTOR); }
}

register(CONTAINER_SELECTOR, CartFeaturedCarousel);
