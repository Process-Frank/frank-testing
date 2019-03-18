/*
 *  Carousel Section
 *    Superclass for any carousel section you build, provides nice defaults that
 *    can be provided as data attributes from the wrapped container.
 *
 *  Version:
 *    1.0.0 - 2018/11/27
 */
import $ from 'jquery';
import 'slick-carousel';

import { ShopifySection } from './../../sections/ShopifySection';
import * as ResponsiveSizes from './../../settings/Responsive';

export class CarouselSection extends ShopifySection {
  constructor(container) {
    super(container);

    this.options = {
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: ResponsiveSizes.xsmall-1,
          settings: { slidesToShow: 3, slidesToScroll: 3 }
        },
        {
          breakpoint: ResponsiveSizes.small-1,
          settings: { slidesToShow: 3, slidesToScroll: 3, arrows: true }
        }
      ]
    };
  }

  initCarousel(carouselElement, moreOverrides) {
    moreOverrides = moreOverrides || {};
    let slick = carouselElement.slick({
      ...this.options,
      ...this.optionOverrides(),
      ...moreOverrides
    });

    return slick;
  }


  optionOverrides() { return {}; }
}
