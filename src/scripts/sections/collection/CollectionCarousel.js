/*
 *  Collection Carousel
 *    Scripts for the collection carousel section, requires the carousel section
 *
 */
import { ProductCarouselSection } from './../product/ProductCarouselSection';
import { register } from './../ShopifySection';

export const CONTAINER_SELECTOR = '[data-collection-carousel-section]';
export const PRODUCTS_SELECTOR = '[data-collection-carousel-products]';

//export const init = e => [ CONTAINER_SELECTOR, CollectionCarousel ];
export class CollectionCarousel extends ProductCarouselSection {
  constructor(container) {
    super(container);
    this.productsContainer = this.getProductsContainer ? this.getProductsContainer() : container.find(PRODUCTS_SELECTOR);
    this.slick = this.initCarousel(this.productsContainer);
  }
}

register(CONTAINER_SELECTOR, CollectionCarousel);
