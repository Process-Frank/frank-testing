import { CarouselSection } from './../carousel/CarouselSection';
import { InitializeInactiveThumbnails } from './../../objects/product/ProductThumbnail';

export class ProductCarouselSection extends CarouselSection {
  constructor(container) {
    super(container);

    //Slick events required for product carousel to function after certain things cause
    //slick to redraw product thumbnails
    container.on('init', (slick) => this.fixProductThumbs());
    container.on('destroy', (e,slick) => this.fixProductThumbs());
    container.on('breakpoint', (e,slick,breakpoint) => this.fixProductThumbs());
    container.on('reInit', (slick) => this.fixProductThumbs());

    InitializeInactiveThumbnails();
  }

  fixProductThumbs() {
    InitializeInactiveThumbnails();
  }
}
