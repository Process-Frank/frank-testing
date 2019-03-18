/*
 *  Product Template
 *    Contains scripts and controls for product page elements.
 */
import $ from 'jquery';
import { printMoney, addToCart, ON_CART_PENDING, ON_CART_FINISHED, getCountOfVariantInCart } from '@process-creative/pc-slate-tools';

import { CarouselSection } from './../sections/carousel/CarouselSection';

import { Swatch, SWATCH_CONTAINER_SELECTOR, ON_VARIANT_CHANGE } from './../objects/swatch/Swatch';
import { ProductTemplateQuantitySelector, AddToCartButton, ProductCarousel } from './../objects/product/';
import { Accordion } from'./../objects/accordion/Accordion';
import * as ResponsiveSizes from './../settings/Responsive';
import { InitializeInactiveThumbnails } from './../objects/product/ProductThumbnail';


//Selectors
export const PRODUCT_TEMPLATE_CONTAINER = '[data-product-template]';
export const PRODUCT_MONEY = '[data-product-money]';
export const PRODUCT_COMPARE_MONEY = '[data-product-compare-money]';
export const PRODUCT_ADD = '[data-product-template-add-to-cart]';
export const PRODUCT_ACCORDION = '[data-product-template-accordion]';
export const PRODUCT_CAROUSEL = '[data-product-template-carousel]';

class ProductTemplate  {
  constructor(container) {
    //Elements
    this.container = container;

    //Setup Product Swatches Widget, Quantity and Add to cart
    this.swatches = new Swatch(this.container);
    this.quantitySelector = new ProductTemplateQuantitySelector(this, this.container);
    this.carousel = new ProductCarousel(this, this.container.find(PRODUCT_CAROUSEL));
    this.addToCart = new AddToCartButton(this, this.container.find(PRODUCT_ADD));

    //Accordion (If it exists)
    let accordionElement = container.find(PRODUCT_ACCORDION);

    if(accordionElement && accordionElement.length) {
      this.accordion = new Accordion(accordionElement);
    }

    $(document).on(ON_VARIANT_CHANGE, (e,variant) => this.onVariantChanged(variant));

    InitializeInactiveThumbnails();
  }


  //Called when the variant selector / swatches changes the variant
  onVariantChanged(variant) {
    let { price, compare_at_price } = variant;

    //Adjust Price Display
    let money = this.container.find(PRODUCT_MONEY);
    if(!price || price <= 0) {
      money.removeAttr('data-money');//Stops any currency converters attempting to convert.
      money.html('FREE');//TODO: Make this not hard coded.
    } else {
      money.attr('data-money', price);
      money.html(printMoney(price));
    }

    //Adjust compare price display
    let compare = this.container.find(PRODUCT_COMPARE_MONEY);
    if(!compare_at_price || compare_at_price <= price) {
      compare.removeAttr('data-money');
      compare.html('');
    } else {
      compare.attr('data-money', compare_at_price);
      compare.html(printMoney(compare_at_price));
    }
  }
}

$(document).ready($(PRODUCT_TEMPLATE_CONTAINER).each( (e,i) => new ProductTemplate($(i)) ));
