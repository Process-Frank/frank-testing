/*
 *  Collection Carousel
 *    Scripts for the collection carousel section, requires the carousel section
 *
 */
import * as ResponsiveSizes from './../../settings/Responsive';
import { CollectionCarousel } from './CollectionCarousel';
import { register } from './../ShopifySection';

export const CONTAINER_SELECTOR = '[data-featured-collection-carousel]';

export class FeaturedCollectionCarousel extends CollectionCarousel {
  optionOverrides() {
    return {
      arrows: false, slidesToShow: 1, slidesToScroll: 1,
      responsive: [
        {
          breakpoint: ResponsiveSizes.small-1,
          settings: { slidesToShow: 2, slidesToScroll: 2 }
        },
        {
          breakpoint: ResponsiveSizes.medium-1,
          settings: { slidesToShow: 3, slidesToScroll: 3 }
        },
        {
          breakpoint: ResponsiveSizes.large-1,
          settings: { slidesToShow: 4, slidesToScroll: 4 }
        }
      ]
    };
  }
}

register(CONTAINER_SELECTOR, FeaturedCollectionCarousel);
