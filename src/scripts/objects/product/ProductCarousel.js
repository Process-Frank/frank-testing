import $ from 'jquery';
import 'slick-carousel';
import * as ResponsiveSizes from './../../settings/Responsive';

export const IMAGE_CAROUSEL = '[data-product-template-carousel-slide]';
export const THUMBNAIL_CAROUSEL = '[data-product-template-thumbnail-slide]';

export const THUMBNAIL_SELECTOR = '[data-product-template-thumbnail-image]';

export class ProductCarousel {
  constructor(template, container) {
    this.template = template;
    this.container = container;

    //Elements
    this.imageCarousel = container.find(IMAGE_CAROUSEL);
    this.thumbnailCarousel = container.find(THUMBNAIL_CAROUSEL);

    //Initialize Slick
    this.imageSlick = this.imageCarousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      adaptiveHeight: true,
      infinite: true
    });

    this.thumbnailCarousel.slick({
      mobileFirst: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeight: true,
      arrows: false,
      infinite: false,
      responsive: [
      ]
    });

    this.container.on('click', THUMBNAIL_SELECTOR, (e) => this.onThumbnailClick(e));
    this.container.on('beforeChange', IMAGE_CAROUSEL, (e, slick, currentSlide, nextSlide) => {
      this.onImageSlideChange(nextSlide);
    })
    this.container.on('beforeChange', THUMBNAIL_CAROUSEL, (e, slick, currentSlide, nextSlide) => {
      this.onThumbnailSlideChange(nextSlide);
    })
    window.test = this;
  }

  onThumbnailClick(e) {
    let self = $(e.currentTarget);
    let index = self.attr('data-index');
    this.goToSlide(index);
  }

  goToSlide(index) {
    this.imageCarousel.slick('slickGoTo', index);
    this.thumbnailCarousel.slick('slickGoTo', index);
    this.setActiveImage(index);
  }

  setActiveImage(index) {
    $(THUMBNAIL_SELECTOR).removeClass('is-active');
    $(`${THUMBNAIL_SELECTOR}[data-index="${index}"]`).addClass('is-active');
  }

  onImageSlideChange(toSlide) {
    this.thumbnailCarousel.slick('slickGoTo', toSlide);
    this.setActiveImage(toSlide);
  }

  onThumbnailSlideChange(toSlide) {
    this.imageCarousel.slick('slickGoTo', toSlide);
    this.setActiveImage(toSlide);
  }
}
