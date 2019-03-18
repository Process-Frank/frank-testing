/*
 *  Reviews Carousel
 *    For showcasing reviews in a carousel.
 *
 *  Version:
 *    1.0.0 - 2018/11/30
 */
import { CarouselSection } from './../carousel/CarouselSection';
import { register } from './../ShopifySection';
import * as ResponsiveSizes from './../../settings/Responsive';

export const CONTAINER_SELECTOR = '[data-reviews-carousel]';
export const CAROUSEL_SELECTOR = '[data-reviews-carousel-carousel]';

export class ReviewsCarousel extends CarouselSection {
  constructor(container) {
    super(container);
    this.carouselContainer = container.find(CAROUSEL_SELECTOR);
    this.slick = this.initCarousel(this.carouselContainer);
  }

  optionOverrides() {
    return {
      responsive: [
        {
          breakpoint: ResponsiveSizes.medium-1,
          settings: { slidesToShow: 3, slidesToScroll: 3, arrows: true }
        }
      ]
    }
  }
}

register(CONTAINER_SELECTOR, ReviewsCarousel);
